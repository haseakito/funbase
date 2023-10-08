import React from 'react'
import { 
    MdDashboard,
    MdImage,
} from 'react-icons/md'


import { TitleForm } from './components/TitleForm'
import { DescriptionForm } from './components/DescriptionForm'
import { ImageForm } from './components/ImageForm'
import { prisma } from '@/libs/db'
import { CategoryForm } from './components/CategoryForm'
import { Category } from '@prisma/client'
import { Alert, AlertIcon } from '@/components/Chakra'
import { ProceedButton } from './components/ProceedButton'
import { ProgressBar } from './components/ProgressBar'
import { ActionButton } from './components/ActionButton'

export default async function page({params} : {params: { postId : string }}) {
    
    const post = await prisma.post.findUnique({
        where: {
            id: params.postId,            
        },
        include: {
            categories: true
        }        
    })

    if (!post) {
        throw new Error('Post Not Found')
    }

    const categorizedList = await prisma.categoriesOnPosts.findMany({
        where: {
            postId: params.postId
        },
        select: {
            category: true
        }
    })


    const categories: Category[] = await prisma.category.findMany({})

    const requiredFields = [
        post.title,
        post.description,
        post.categories,
        post.imageUrl,
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
            index={1}
        />
        <div className='max-w-5xl mx-auto h-full p-6'>
            <div className='flex justify-between'>
                <div className='flex flex-col gap-y-3'>
                    <h1 className='text-2xl font-semibold'>
                        Edit Post
                    </h1>
                    <span className='text-sm text-slate-700'>
                        Complete all fields {completionText}
                    </span>
                </div>                
                <ActionButton
                    postId={post.id}                    
                />                
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-14'>
                <div className=''>                
                    <div className='flex gap-x-2'>
                        <MdDashboard size={30} className='rounded-full bg-sky-300 text-gray-600' />
                        <h2 className='text-xl'>
                            Customize your post
                        </h2>
                    </div>
                    <TitleForm
                        postId={post.id}
                        title={post.title}
                    />
                    <DescriptionForm
                        postId={post.id}
                        description={post.description || ''}
                    />                
                    <CategoryForm
                        postId={post.id}
                        categories={categorizedList.map((categorized) => ({
                            value: categorized.category.id,
                            label: categorized.category.name
                        }))}
                        options={categories.map((category) => ({
                            value: category.id,
                            label: category.name
                        }))}
                    />  
                </div>
                <div className=''>
                    <div className='flex items-center gap-x-2'>
                        <MdImage size={30} className='rounded-full bg-sky-300 text-gray-600' />
                        <h2 className='text-xl'>
                            Upload post's thumnail
                        </h2>
                    </div>
                    <ImageForm
                        postId={post.id}
                        imageUrl={post.imageUrl || ''}
                    />                    
                </div>
            </div>
            <div className='flex justify-end mt-10'>
                <ProceedButton
                    postId={post.id}
                    href='video'
                    disabled={totalFields !== completedFields}
                />
            </div>
        </div>
    </div>
  )
}
