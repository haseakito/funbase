import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {

    interface User {        
        id: string
    }

    interface Session {
        user: User & {            
            id: string
        }        
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string
    }
}