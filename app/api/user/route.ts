import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/libs/db"
import bcrypt from 'bcrypt'
import { getServerSession } from "next-auth"
import { authOptions } from "@/libs/auth"

/**
 * Asynchronous function handling creating the user
 * 
 * @param req 
 * @returns NextResponse
 */
export async function POST(req: NextRequest) {
    // Parse the body of Json object
    const { username, email, password } = await req.json()

    // Query the user with email
    const userExist = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    // if there's already a user with this email, then return an error
    if (userExist) {
        return NextResponse.json({message: 'Email already exists' }, {status: 500} )
    }

    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create the new user
    const newUser = await prisma.user.create({
        data: {
            name: username,
            email: email,
            hashedPassword: hashedPassword
        }
    })

    // Return the user
    return NextResponse.json(newUser, {status: 201})
}

/**
 * Asynchronous function handling fetching multiple users
 * 
 * @param req 
 * @returns NextResponse
 */
export async function GET(req: NextRequest) {
    // Protect this API route by checking the session
    const session = await getServerSession(authOptions)

    // If user is not logged in, then return an error
    if (!session) {
        return NextResponse.json({message: 'Invalid Credentials'}, {status: 403})
    }

    // Query multiple users
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            followers: true,
            following: true
        }
    })

    // If there's no user in the database, then return an error
    if (!users) {
        return NextResponse.json({message: 'User Not Found'}, {status: 404})
    }

    // Return the users
    return NextResponse.json(users, {status: 200})
}

/**
 * Asynchronous function handling deleting the user
 * 
 * @param req 
 * @returns NextResponse
 */
export async function DELETE(req: NextRequest) {
    // Protect this API route by checking the session
    const session = await getServerSession(authOptions)

    // If user is not logged in, then return an error
    if (!session) {
        return NextResponse.json({message: 'Invalid Credentials'}, {status: 403})
    }

    // Delete the user with his/her userId
    await prisma.user.delete({
        where: {
            id: session.user.id
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