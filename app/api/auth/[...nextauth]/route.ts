import NextAuth, { CookiesOptions, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { refreshAccessToken, verifyJwtAccessToken } from "../../lib/jwt";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "name", type: "text", placeholder: "아이디"},
                password: {  label: "Password", type: "password", placeholder: "비밀번호"}
            },
            async authorize(credentials, req) {
                const res = await fetch(`${process.env.NEXTAUTH_URL}/api/sign/login`, {
                    cache: 'no-store',
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json()
                if(res.ok && user.accesstoken){
                    return user
                }
                else{
                    return null
                }
            },
        })
    ], 
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60,
    },
    jwt:{
        maxAge: 60 * 60,
    },
    callbacks: {
        async redirect({url, baseUrl}){
            return `${baseUrl}/post`
        },

        async jwt({token, user}){

            // if(user){
            //     token.token = user.accessToken
            //     return{...token, ...user}
            // }

            return {...token, ...user}
        },
        async session({session, token}){
            session.user = token as any;
            const verify = verifyJwtAccessToken(token?.accesstoken)
            if(!verify){
                const now = new Date(Date.now()).toISOString()
                session.expires = now
                return{...session, error: '토큰이 만료되었습니다.'}
            }
            session.token = token?.accesstoken
            return {...session}
        }
    },     
})

export { handler as GET, handler as POST}