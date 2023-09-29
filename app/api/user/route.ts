import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/libs/db"
import bcrypt from 'bcrypt'

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

    return NextResponse.json(newUser)
}