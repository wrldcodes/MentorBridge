declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: "ADMIN" | "MENTOR" | "MENTEE";
    };
  }
  interface User {
    id: string;
    role?: "ADMIN" | "MENTOR" | "MENTEE";
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: "ADMIN" | "MENTOR" | "MENTEE";
  }
}
