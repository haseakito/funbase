import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from './db'
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import bcrypt from 'bcrypt'

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/auth/login'            
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        // Google Provider
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID || '',
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET || ''
        }),
        //Custom Provider with Email and Password
        CredentialsProvider({
            name: "Credentials",
            credentials: {                
                email: { label: 'email', type: 'email', },
                password: { label: 'password', type: 'password'}
            },
            async authorize(credentials) {                
                // Check if the email and password is both submitted
                if (!credentials?.email || !credentials.password) {
                    throw new Error('Email and Password should not be empty')
                }

                // Query the user with email
                const user = await prisma.user.findUnique({                    
                    where: {
                        email: credentials.email
                    }
                })                

                // If there is no user for login information, throw an error
                if (!user || !user.hashedPassword) {
                    throw new Error('No User Found')
                }                
                
                // Check if the password matches
                const passwordMatch = await bcrypt.compare(credentials?.password, user.hashedPassword)
                
                // If the password does not match, throw an error
                if (!passwordMatch) {
                    throw new Error('Incorrect Password')
                }
                
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            }
        }),        
    ],    
    callbacks: {
        async jwt({ token, user }) {            
            // Pass the user id to token            
            if (user) {                
                token.id = user.id
            }            
            return token
        },
        async session({ session, token}) {
            // Pass the user id in the token to session for client
            session.user.id = token.id               
            return session                
        }
    }
}
