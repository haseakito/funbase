import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import { prisma } from "@/libs/db";

/**
 * Asynchronous function handling creating a post
 * 
 * @param req 
 * @returns NextResponse
 */
export async function POST(req: NextRequest) {
    // Protect this API route by checking the session
    const session = await getServerSession(authOptions)

    // If user is not logged in, then return an error
    if (!session?.user.id) {
        return NextResponse.json({message: 'Invalid Credentials'}, { status: 401 })
    }

    // Parse the json body
    const data = await req.json()

    // Create the post with provided userId and data passed
    const post = await prisma.post.create({
        data: {            
            userId: session.user.id,
            title: data.title,        
        }
    })
    .catch((err) => {
        // If there's an error while executing, return an error
        return NextResponse.json(err, {status: 500})
    })

    // Return the post to the client
    return NextResponse.json(post, {status: 201})
}

export async function GET(req: NextRequest) {
    // Protect this API route by checking the session
    const session = await getServerSession(authOptions)

    // If user is not logged in, then return an error
    if (!session?.user.id) {
        return NextResponse.json({message: 'Invalid Credentials'}, { status: 401 })
    }

    // Query the posts with provided userId
    const post = await prisma.post.findMany({
        where: {
            userId: session.user.id
        }
    })
    .catch((err) => {
        return NextResponse.json(err, {status: 500})
    })

    return post
}