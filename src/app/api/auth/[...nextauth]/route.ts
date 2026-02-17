import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";
import { cookies } from "next/headers";
import { Role } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!user) throw new Error("USER_NOT_FOUND");
        if (!user.password) {
          throw new Error("Google account only");
        }

        const isValid = await bcrypt.compare(
          credentials!.password,
          user.password,
        );
        if (!isValid) throw new Error("Invalid password");

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role, //include role in token
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user?.email) return false;

      const cookieStore = await cookies();
      const pendingRole = cookieStore.get("pending_role")?.value;
      const role =
        pendingRole === "MENTOR" || pendingRole === "MENTEE"
          ? (pendingRole as Role)
          : "MENTEE";

      // For OAuth sign-ins (Google), ensure user exists in database
      if (account?.provider === "google") {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          // Create new user for OAuth
          const newUser = await prisma.user.create({
            data: {
              email: user.email,
              name: user.name || null,
              image: user.image || null,
              role: role,
              password: null, // OAuth users don't have passwords
            },
          });

          // Create the OAuth account link
          await prisma.account.create({
            data: {
              userId: newUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              refresh_token: account.refresh_token,
              access_token: account.access_token,
              expires_at: account.expires_at,
              token_type: account.token_type,
              scope: account.scope,
              id_token: account.id_token,
              session_state: account.session_state,
            },
          });

          user.id = newUser.id;
        } else {
          // User exists - check if account link exists
          const existingAccount = await prisma.account.findUnique({
            where: {
              provider_providerAccountId: {
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              },
            },
          });

          if (!existingAccount) {
            // Create the account link for existing user
            await prisma.account.create({
              data: {
                userId: existingUser.id,
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                refresh_token: account.refresh_token,
                access_token: account.access_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
                session_state: account.session_state,
              },
            });
          }

          // Update existing user's role if pending role exists
          if (pendingRole === "MENTOR" || pendingRole === "MENTEE") {
            await prisma.user.update({
              where: { id: existingUser.id },
              data: { role: role },
            });
          }

          user.id = existingUser.id;
        }
      } else if (
        user?.id &&
        (pendingRole === "MENTOR" || pendingRole === "MENTEE")
      ) {
        // For credentials sign-in, update role if needed
        await prisma.user.update({
          where: { id: user.id },
          data: { role: role },
        });
      }

      return true;
    },
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        // On initial sign-in, fetch the user from database to get the role and name
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
          select: { id: true, name: true, role: true },
        });

        if (dbUser) {
          token.id = dbUser.id;
          token.name = dbUser.name;
          token.role = dbUser.role;
        } else {
          token.role = "MENTEE";
        }
        return token;
      }

      // On subsequent requests, ensure role and name are present
      if ((!token.role || !token.name) && token.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email as string },
          select: { id: true, name: true, role: true },
        });
        if (dbUser) {
          token.id = dbUser.id;
          token.name = dbUser.name;
          token.role = dbUser.role;
        }
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.role = (token.role ?? "MENTEE") as
          | "ADMIN"
          | "MENTOR"
          | "MENTEE";
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
