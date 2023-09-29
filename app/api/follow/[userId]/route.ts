import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "@/libs/auth"
import { getServerSession } from "next-auth"
import { prisma } from "@/libs/db"

/**
 * Asynchronous function handling following a specific user
 * 
 * @param param
 * @returns NextResponse
 */
export async function POST(req: NextRequest, { param }: { param: { userId: string }}) {
    // Protect this API route by checking the session
    const session = await getServerSession(authOptions)

    // If user is not logged in, then return an error
    if (!session?.user.id) {
        return NextResponse.json({message: 'Invalid Credentials'}, {status: 403})
    }

    // If users follows themselves, return an error
    if (session.user.id === param.userId) {
        return NextResponse.json({message: 'Invalid Credentials'}, {status: 403})
    }

    // Create the new follow
    await prisma.follows.create({
        data: {     
            followerId: session.user.id,
            followingId: param.userId
        }
    })
    .then(() => {
        return NextResponse.json({message: 'Followed Successfully'}, {status: 200})
    })
    .catch((err) => {
        // If there's an error, return an error
        return NextResponse.json(err, {status: 500})
    })
}


/**
 * Asynchronous function handling unfollowing a specific user
 * 
 * @param param
 * @returns NextResponse
 */
export async function DELETE(req: NextRequest, {param }: { param: { userId: string }}) {
    // Protect this API route by checking the session
    const session = await getServerSession(authOptions)

    // If user is not logged in, then return an error
    if (!session?.user.id) {
        return NextResponse.json({message: 'Invalid Credentials'}, {status: 403})
    }

    // Delete the follow with followerId and followingId to specify which follow
    await prisma.follows.delete({
        where: {
            followerId_followingId: {
                followerId: param.userId,
                followingId: session.user.id
            }            
        }
    })
    .then(() => {        
        return NextResponse.json({message: 'Unfollowed Successfully'}, {status: 200})
    })
    .catch((err) => {
        // If there's an error, return an error
        return NextResponse.json(err, {status: 500})
    })
}