import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/libs/auth"
import { prisma } from "@/libs/db"
import bcrypt from 'bcrypt'

/**
 * Asynchronous function handling getting a specific user
 * 
 * @param req 
 * @param param 
 * @returns NextResponse
 */
export async function GET(req: NextRequest, { params }: { params: { userId: string }}) {
    // Protect this API route by checking the session
    const session = await getServerSession(authOptions)

    // If user is not logged in, then return an error
    if (!session) {
        return NextResponse.json({message: 'Invalid Credentials'}, {status: 403})
    }

    // Query the user with his/her userId
    const user = await prisma.user.findUnique({
        where: {
            id: params.userId
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
export async function PATCH(req: NextRequest, { params }: { params: { userId: string }}) {
    // Protect this API route by checking the session
    const session = await getServerSession(authOptions)

    // If user is not logged in, then return an error
    if (!session?.user) {
        return NextResponse.json({message: 'Invalid Credentials'}, {status: 403})
    }

    // If user tries to delete another user, then return an error
    if (session.user.id !== params.userId) {
        return NextResponse.json({message: 'Invalid Credentials'}, {status: 403})
    }

    // Parse the json body
    const data = await req.json()


    // If the user tries to udpate password, hash the password and update it
    if (data.hashedPassword) {
            
        const hashedPassword = await bcrypt.hash(data.hashedPassword, 10)

        await prisma.user.update({
            where: {
                id: params.userId
            },
            data: {
                hashedPassword: hashedPassword
            }
        })
        .then(() => {
            return NextResponse.json({message: 'Successfully updated password'}, {status: 200})
        })
        .catch((err) => {
            return NextResponse.json(err, {status: 500})
        })
    }

    // Query the user with his/her userId and update the data
    const user = await prisma.user.update({
        where: {
            id: params.userId
        },
        data: {
            ...data
        }
    })
    .catch((err) => {
        return NextResponse.json(err, {status: 500})
    })

    return NextResponse.json(user, {status: 200})
}

/**
 * Asynchronous function handling deleting the user
 * 
 * @param req 
 * @returns NextResponse
 */
export async function DELETE(req: NextRequest, { params }: { params: { userId: string }}) {
    // Protect this API route by checking the session
    const session = await getServerSession(authOptions)

    console.log(params)

    // If user is not logged in, then return an error
    if (!session) {
        return NextResponse.json({message: 'Invalid Credentials'}, {status: 403})
    }

    // If the user is deleting other user, then return an error
    if (session.user.id !== params.userId) {
        return NextResponse.json({message: 'Invalid Credentials'}, {status: 403})
    }

    // Delete the user with his/her userId
    await prisma.user.delete({
        where: {
            id: params.userId
        }
    })
    .then(() => {
        return NextResponse.json({message: 'User Successfully Deleted'}, {status: 200})
    })
    .catch((err) => {
        // If there's an error, return an error
        return NextResponse.json(err, {status: 500})
    })
}