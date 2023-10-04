import { prisma } from '@/libs/db'
import MuxPlayer from '@mux/mux-player-react'
import React from 'react'

export default async function page({ params } : { params: { postId: string } }) {

    const post = await prisma.post.findUnique({
        where: {
            id: params.postId
        },
        include: {
            muxData: true
        }
    })

  return (
    <div>
        <MuxPlayer
            playbackId={post?.muxData?.playbackId || ''}
        />
    </div>
  )
}
