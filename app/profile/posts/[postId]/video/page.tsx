import React from 'react'
import Link from 'next/link'
import {
    MdOutlineArrowCircleLeft,
    MdVideoLibrary
} from 'react-icons/md'
import { VideoForm } from './components/VideoForm'
import { prisma } from '@/libs/db'
import { Alert, AlertIcon } from '@/components/Chakra'
import { ProgressBar } from '../components/ProgressBar'


export default async function page({params} : {params: { postId : string }}) {

    const post = await prisma.post.findUnique({
        where: {
            id: params.postId
        },
        include: {
            muxData: true
        }
    })

    if (!post) {
        throw new Error('Post Not Found')
    }

  return (
    <div>
        { !post.published && (
            <Alert status='warning'>
                <AlertIcon />
                This post is not yet published. A few steps away from making your post visible!
            </Alert>
        )}
        <ProgressBar
            index={2}
        />
        <div className='max-w-5xl mx-auto h-full p-6'>
            <div className='flex items-center justify-between'>
                <div className=''>
                <Link
                    href={`/profile/posts/${params.postId}`}
                    className='flex items-center text-sm hover:opacity-75 transition mb-6'
                >
                    <MdOutlineArrowCircleLeft
                        className='h-4 w-4 mr-2'
                    />
                    Back to edit post
                </Link>
            </div>
        </div>    
            <div className='flex flex-col gap-y-3'>
                <h1 className='text-2xl font-semibold'>
                    Edit Video
                </h1>
                <span className='text-sm text-slate-700'>
                    Complete all fields
                </span>        
            </div>
            <div className='mt-14'>
                <div className='flex items-center gap-x-2'>
                    <MdVideoLibrary size={30} className='rounded-full bg-sky-300 text-gray-600' />
                    <h2 className='text-xl'>
                        Upload video
                    </h2>
                </div>
                <div>
                    <VideoForm
                        postId={post.id}
                        videoUrl=''
                        muxData={post.muxData}
                    />
                </div>
            </div>        
        </div>
    </div>
  )
}
