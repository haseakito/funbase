import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "@/libs/auth"
import { getServerSession } from "next-auth"
import { prisma } from "@/libs/db"

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
    // Protect this API route by checking the session
    const session = await getServerSession(authOptions)

    // If user is not logged in, then return an error
    if (!session) {
        return NextResponse.json({message: 'Invalid Credentials'}, {status: 403})
    }

    // Query the follow with the folloerId and followingId provided
    const follow = await prisma.follows.findUnique({
        where: {
            followerId_followingId: {
                followerId: session.user.id,
                followingId: params.userId
            }
        }
    })
    .catch((err) => {
        return NextResponse.json(err, {status: 500})
    })

    if (!follow) {
        return NextResponse.json(null, {status: 202})
    }

    return NextResponse.json(follow, {status: 200})
}

export async function POST(req: NextRequest, { params }: { params: { userId: string } }) {
    // Protect this API route by checking the session
    const session = await getServerSession(authOptions)

    // If user is not logged in, then return an error
    if (!session) {
        return NextResponse.json({message: 'Invalid Credentials'}, {status: 403})
    }

    // If users follows themselves, return an error
    if (session.user.id === params.userId) {
        return NextResponse.json({message: 'Invalid Credentials'}, {status: 403})
    }

    // Query the follow with followerId and followingId provided
    const follow = await prisma.follows.findUnique({
        where: {
            followerId_followingId: {
                followerId: session.user.id,
                followingId: params.userId   
            }
        }
    })

    // Check if the user has already followed
    if (follow) {
        return NextResponse.json({message: 'Already followed'}, {status: 500 })
    }

    // Create the new follow
    await prisma.follows.create({
        data: {     
            followerId: session.user.id,
            followingId: params.userId
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