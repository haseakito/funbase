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
import { ProceedButton } from '../components/ProceedButton'
import { ActionButton } from '../components/ActionButton'


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

    const requiredFields = [
        post.muxData
    ]

    // Total number of fields to fill before publishing the post
    const totalFields = requiredFields.length
    // Subtotal number of fields that are already completed
    const completedFields = requiredFields.filter(Boolean).length

    // Text showing how many fields are completed 
    const completionText = `(${completedFields}/${totalFields})`

  return (
    <div>
        { !post.published && (
            <Alert mt={5} status='warning'>
                <AlertIcon />
                This post is not yet published. A few steps away from making your post visible!
            </Alert>
        )}
        <ProgressBar
            index={2}
        />
        <div className='max-w-5xl mx-auto h-full p-6'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center justify-between'>
                <Link
                    href={`/profile/posts/${params.postId}`}
                    className='flex items-center text-sm hover:opacity-75 transition mb-6'
                >
                    <MdOutlineArrowCircleLeft
                        className='h-4 w-4 mr-2'
                    />
                    Back to edit post
                </Link>
                <ActionButton
                    postId={params.postId}                    
                />
            </div>
        </div>    
            <div className='flex flex-col gap-y-3'>
                <h1 className='text-2xl font-semibold'>
                    Edit Video
                </h1>
                <span className='text-sm text-slate-700'>
                    Complete all fields {completionText}
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
                        videoUrl={post.muxData?.playbackId || ''}
                        muxData={post.muxData}
                    />
                </div>
            </div>
            <div className='flex justify-end mt-10'>
                <ProceedButton
                    postId={post.id}
                    href='price'
                    disabled={totalFields !== completedFields}
                />
            </div>        
        </div>
    </div>
  )
}
