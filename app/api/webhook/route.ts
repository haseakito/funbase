import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers"
import Stripe from "stripe";
import { stripe } from "@/libs/stripe";
import { prisma } from "@/libs/db";

export async function POST(req: NextRequest) {
    // Parse the body
    const body = await req.text()

    // Parse the header to get stripe signiture
    const signiture = req.headers.get('stripe-signature') as string

    let event: Stripe.Event
    
    try {
        // Create an event with body, signiture, and webhook secret provided
        event = stripe.webhooks.constructEvent(
            body,
            signiture,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (err: any) {
        // Return an error
        return NextResponse.json(`Webhook Error: ${err.message}`, {status: 400})
    }

    const session = event.data.object as Stripe.Checkout.Session

    // Obtain the userId and postId from session metadata
    const userId = session.metadata?.userId
    const postId = session.metadata?.postId

    console.log(userId, postId)
    
    if (event.type === 'checkout.session.completed') {
        if (!userId || !postId) {
            // Return an error when the metadata is missing
            return NextResponse.json('Webhook roor: Missing Metadata', {status: 400})
        }

        // Create an purchase with userId and postId provided
        await prisma.purchase.create({
            data: {
                userId: userId,
                postId: postId
            },
            include: {
                post: true
            }
        })

    } else {
        // Return an error, but with status of 200 to avoid throwing 400 error too much 
        return NextResponse.json(`Webhook Eror: Unhandled event type ${event.type}`, {status: 200})
    }

    return NextResponse.json(null, {status: 200})
}