import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "@/libs/auth"
import { getServerSession } from "next-auth"
import { prisma } from "@/libs/db"


export async function POST(req: NextRequest, { params }: { params: { postId: string } }) {
    // Protect this API route by checking the session
    const session = await getServerSession(authOptions)

    // If user is not logged in, then return an error
    if (!session) {
        return NextResponse.json({message: 'Invalid Credentials'}, {status: 403})
    }

    // Query the like with userId and postId provided
    const existingLike = await prisma.like.findUnique({
        where: {
            userId_postId: {
                userId: session.user.id,
                postId: params.postId
            }
        },
        include: {
            post: true
        }
    })

    // If the user tries to like their own post, return an error
    if (existingLike?.post.userId === session.user.id) {
        return NextResponse.json({message: 'Unauthorized to perform this action'}, {status: 500})
    }

    // Create a like with userId and postId provided
    await prisma.like.create({
        data: {
            userId: session.user.id,
            postId: params.postId
        }
    })
    .then(() => {
        return NextResponse.json({message: 'Successfully liked this post'}, {status: 200})
    })
    .catch((err) => {
        return NextResponse.json(err, {status: 500})
    })
}

export async function DELETE(req: NextRequest, { params }: { params: { postId: string } }) {
    // Protect this API route by checking the session
    const session = await getServerSession(authOptions)

    // If user is not logged in, then return an error
    if (!session) {
        return NextResponse.json({message: 'Invalid Credentials'}, {status: 403})
    }
    
    // Query the like with userId and postId provided
    const existingLike = await prisma.like.findUnique({
        where: {
            userId_postId: {
                userId: session.user.id,
                postId: params.postId
            }
        },
        include: {
            post: true
        }
    })

    // If the user tries to like their own post, return an error
    if (existingLike?.post.userId === session.user.id) {
        return NextResponse.json({message: 'Unauthorized to perform this action'}, {status: 500})
    }

    // Delete the like with userId and postId provided
    await prisma.like.delete({
        where: {
            userId_postId: {
                userId: session.user.id,
                postId: params.postId
            }
        }
    })
    .then(() => {
        return NextResponse.json({message: 'Successfully deleted this post'}, {status: 200})
    })
    .catch((err) => {
        return NextResponse.json(err, {status: 500})
    })
}