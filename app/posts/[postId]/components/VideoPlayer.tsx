'use client'

import React, { useState } from 'react'
import {
    FaLock
} from 'react-icons/fa'
import MuxPlayer from '@mux/mux-player-react'
import { Icon } from '@chakra-ui/react'

type VideoPlayerProps = {
    playbackId: string,
    isLocked: boolean,
    isOwned: boolean,
    title: string
}

export function VideoPlayer(props: VideoPlayerProps) {

    const [ready, setReady] = useState(false)

    const { title, playbackId, isLocked, isOwned } = props    
    
  return (
    <div className='relative aspect-video'>
        { isLocked || !isOwned ? (
            <div className='absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2'>
                <Icon as={FaLock} color='white' />
                <p className='text-white'>This Post is only available after your purchase</p>
            </div>    
        )
        :
        null
        }
        {
            !isLocked || isOwned ? (
                <MuxPlayer
                    title={title}
                    playbackId={playbackId}
                    autoPlay
                    onCanPlay={() => setReady(true)}
                    className=''                
                />
            )
            :
            null
        }
    </div>
  )
}
