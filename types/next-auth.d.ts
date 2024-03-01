import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        token?: string,
        error?: string,
        user? : {
            id: number,
            name: string,
            email: string,
            accessToken?: string,
        };
    }
    
    interface User {
        id: number,
        name: string,
        email: string,
        accessToken?: string,
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accesstoken?: string,
        exp?: number,
        iat?: number,
        jti?: string,
    }
}