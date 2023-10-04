import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import { prisma } from "@/libs/db";

type formData = {
    postId: string,
    categoryId: string
}

export async function PATCH(req: NextRequest) {
    // Protect this API route by checking the session
    const session = await getServerSession(authOptions)

    // If user is not logged in, then return an error
    if (!session?.user) {
        return NextResponse.json({message: 'Invalid Credentials'}, {status: 403})
    }

    const data: formData = await req.json()   
        
    
    const post = await prisma.categoriesOnPosts.upsert({
        where: {
            postId_categoryId: {
                postId: data.postId,
                categoryId: data.categoryId,
            }
        },        
        create: {            
            postId: data.postId,            
            categoryId: data.categoryId,            
        },
        update: {
            postId: data.postId,            
            categoryId: data.categoryId,            
        }        
    })
    .catch((err) => {
        return NextResponse.json(err, {status: 500})
    })


   return NextResponse.json(post, {status: 200})
}