import NextAuth from "next-auth";

declare module 'next-auth' {
    interface Session {
        user: {
            name: string;
            email: string;
            role: 'ADMIN' | 'MENTOR' | 'MENTEE';
        };
    }
    interface User {
        role: 'ADMIN' | 'MENTOR' | 'MENTEE';
    }
}
declare module 'next-auth/jwt' {
    interface JWT {
        role: 'ADMIN' | 'MENTOR' | 'MENTEE';
    }
}