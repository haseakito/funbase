import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/libs/auth"
import { prisma } from "@/libs/db"

/**
 * Asynchronous function handling getting a specific user
 * 
 * @param req 
 * @param param 
 * @returns NextResponse
 */
export async function GET(req: NextRequest, { param }: { param: { userId: string }}) {
    // Protect this API route by checking the session
    const session = await getServerSession(authOptions)

    // If user is not logged in, then return an error
    if (!session) {
        return NextResponse.json({message: 'Invalid Credentials'}, {status: 403})
    }

    // Query the user with his/her userId
    const user = await prisma.user.findUnique({
        where: {
            id: param.userId
        },
        // Exclude the security related fields such as Account, Session, and password
        select: {
            id: true,
            name: true,
            email: true,
            followers: true,
            following: true
        }
    })
    
    // If there's not a user with with the provided userId, then return an error
    if (!user) {
        return NextResponse.json({messgae: 'User Not Found'}, {status: 404})    
    }

    return user
}

/**
 * Asynchronous function handling updating the user profile
 * 
 * @param req 
 * @param param 
 * @returns NextResponse
 */
export async function PUT(req: NextRequest, { param }: { param: { userId: string }}) {
    // Protect this API route by checking the session
    const session = await getServerSession(authOptions)

    // If user is not logged in, then return an error
    if (!session) {
        return NextResponse.json({message: 'Invalid Credentials'}, {status: 403})
    }

    // If user tries to delete another user, then return an error
    if (session.user?.id !== param.userId) {
        return NextResponse.json({message: 'Invalid Credentials'}, {status: 403})
    }

    // Parse the json body
    const { name, email, image } = await req.json()

    // Query the user with his/her userId and update the data
    const user = await prisma.user.update({
        where: {
            id: param.userId
        },
        data: {
            name: name,
            email: email,
            image: image
        },
        select: {
            id: true,
            name: true,
            email: true,
            followers: true,
            following: true
        }
    })

    return NextResponse.json(user, {status: 200})
}
