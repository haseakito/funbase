import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import { prisma } from "@/libs/db";
import { stripe } from "@/libs/stripe";

export async function POST(req: NextRequest, { params }: { params: { postId: string } }) {

    // Protect this API route by checking the session
    const session = await getServerSession(authOptions)
        
    // If user is not logged in, then return an error
    if (!session?.user) {
        return NextResponse.json({message: 'Invalid Credentials'}, { status: 401 })
    }

    // Query the post with postId provided
    const post = await prisma.post.findUnique({
        where: {
            id: params.postId,
            published: true
        }
    })

    // Chech if there's a post for this postId
    if (!post) {
        return NextResponse.json({message: 'Post Not Found'}, {status: 404})
    }

    // Query the purchase history with userId and postId provided to check if the user has already bought this post
    const purchase = await prisma.purchase.findUnique({
        where: {
            userId_postId: {
                userId: session.user.id,
                postId: params.postId
            }
        }
    })

    // If the user has bought this post, return an error
    if (purchase) {
        return NextResponse.json({message: "Already purchased this post"}, {status: 409})
    }

    // Query the stripe account related to the user
    const stripeAccount = await prisma.stripeAccount.findUnique({
        where: {
            userId: session.user.id
        },
        select: {
            stripeAccountId: true
        }
    })

    if (!stripeAccount) {
        await stripe.customers.create({
            email: session.user.email!
        })
        .then((res) => {
            return NextResponse.json(res, {status: 201})
        })
        .catch((err) => {
            return NextResponse.json(err, {status: 400})
        })
    }

    const stripewSession = await stripe.checkout.sessions.create({
        line_items: [
            {
                quantity: 1,
                price_data: {
                    currency: "USD",
                    product_data: {
                        name: post.title,
                        description: post.description!,
                    },
                    unit_amount: Math.round(post.price! * 100)
                },
            }
        ],
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/posts/${post.id}?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/posts/${post.id}?canceled=true`,
        metadata: {
            postId: post.id,
            userId: session.user.id
        }
    })

    return NextResponse.json({ url: stripewSession.url }, {status: 200})

}