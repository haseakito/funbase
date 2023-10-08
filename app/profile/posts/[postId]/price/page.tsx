import React from 'react'
import { MdOutlineArrowCircleLeft } from 'react-icons/md'
import {AiFillDollarCircle } from 'react-icons/ai'
import { Alert, AlertIcon } from '@/components/Chakra'
import { ProgressBar } from '../components/ProgressBar'
import Link from 'next/link'
import { PriceForm } from './components/PriceForm'
import { ActionButton } from '../components/ActionButton'
import { prisma } from '@/libs/db'

export default async function page({params} : {params: { postId : string }}) {
    
    const post = await prisma.post.findUnique({
        where: {
            id: params.postId
        }
    })

    if (!post) {
        throw new Error('Post Not Found')
    }

    const requiredFields = [
        post.price
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
            index={3}
        />
        <div className='max-w-5xl mx-auto h-full p-6'>
            <div className='flex items-center justify-between'>                
                <Link
                    href={`/profile/posts/${params.postId}/video`}
                    className='flex items-center text-sm hover:opacity-75 transition mb-6'
                >
                    <MdOutlineArrowCircleLeft
                        className='h-4 w-4 mr-2'
                    />
                    Back to the previous page
                </Link>
                <ActionButton
                    postId={params.postId}                    
                />
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
                    <AiFillDollarCircle size={30} className='rounded-full bg-sky-300' />
                    <h2 className='text-xl font-medium'>
                        Set price
                    </h2>
                </div>
                <div>
                    <PriceForm
                        postId={params.postId}
                        price={post.price || 0}
                    />
                </div>
            </div>        
        </div>
    </div>
  )
}
