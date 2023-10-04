import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import { prisma } from "@/libs/db";

export async function GET(req: NextRequest, { params }: { params: { postId: string } }) {
    // Protect this API route by checking the session
    const session = await getServerSession(authOptions)

    // If user is not logged in, then return an error
    if (!session) {
        return NextResponse.json({message: 'Invalid Credentials'}, {status: 403})
    }

    // Query the post with provided postId
    const post = await prisma.post.findUnique({
        where: {
            id: params.postId
        },
        select: {
            categories: true
        }
    })
    .catch((err) => {
        // 
        return NextResponse.json(err, {status: 500})
    })
    
    // Return the post
    return NextResponse.json(post, {status: 200})
}

export async function PATCH(req: NextRequest, { params }: { params: { postId: string } }) {
    // Protect this API route by checking the session
    const session = await getServerSession(authOptions)
    
    // If user is not logged in, then return an error
    if (!session?.user) {
        return NextResponse.json({message: 'Invalid Credentials'}, { status: 401 })
    }

    // Query the post with provided postId
    const ownPost = await prisma.post.findUnique({
        where: {
            id: params.postId
        }
    })

    // If the post does not belong to the user, return an error
    if (session.user.id !== ownPost?.userId) {
        throw new Error('Unauthorized to perform this action')
    }
    
    // Parse the json body
    const data = await req.json()

    // Update the post with the provided postId
    const post = await prisma.post.update({
        where: {
            id: params.postId,
            userId: session.user.id
        },
        data: data
    })
    .catch((err) => {
        return NextResponse.json(err, {status: 500})
    })
    

    return NextResponse.json(post, {status: 200})
}

export async function DELETE(req: NextRequest, { params }: { params: { postId: string } }) {
    // Protect this API route by checking the session
    const session = await getServerSession(authOptions)

    // If user is not logged in, then return an error
    if (!session?.user.id) {
        return NextResponse.json({message: 'Invalid Credentials'}, { status: 401 })
    }

    const post = await prisma.post.delete({
        where: {
            id: params.postId
        }
    })
    .then(() => {
        return NextResponse.json({message: 'Deleted Successfully'}, {status: 200})
    })
    .catch((err) => {
        return NextResponse.json({message: 'Internal'}, {status: 500})
    })
}