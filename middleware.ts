// Export the default authentication middleware from NextAuth
export { default } from 'next-auth/middleware'

// Specific paths or routes on which middleware runs
export const config = {
    matcher: ['/users/:path', '/posts/:path','/profile/:path'],
}