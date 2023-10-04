import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { prisma } from "@/libs/db";
import Mux from '@mux/mux-node'

const { Video } = new Mux(
    process.env.MUX_TOKEN_ID || '',
    process.env.MUX_TOKEN_SECRET || ''
)

export async function POST(req: NextRequest, { params }: { params: { postId: string } }) {

    // Protect this API route by checking the session
    const session = await getServerSession(authOptions)

    // If user is not logged in, then return an error
    if (!session) {
        return NextResponse.json({message: 'Invalid Credentials'}, {status: 403})
    }

    

    // Parse the json body
    const data = await req.json()

    // Query the muxData with provided postId
    const existingMuxData = await prisma.muxData.findFirst({
        where: {
            postId: params.postId
        }
    })

    // If there's already a muxData with this postId, then delete the record
    if (existingMuxData) {
        await Video.Assets.del(existingMuxData.assetId)
        await prisma.muxData.delete({
            where: {
                id: existingMuxData.id
            }
        })
    }

    // Create an asset in Mux
    const asset = await Video.Assets.create({
        input: data.videoUrl,
        playback_policy: 'public',
        test: false
    })

    // Create muxData with the assetId and playbackId returned
    const mux = await prisma.muxData.create({
        data: {
            postId: params.postId,
            assetId: asset.id,
            playbackId: asset.playback_ids?.[0]?.id
        }
    })
    .catch((err) => {
        return NextResponse.json(err, {status: 500})    
    })

    return NextResponse.json(mux, {status: 201})
}