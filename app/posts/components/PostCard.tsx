'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Avatar } from '@chakra-ui/react'
import { Category, Post, User } from '@prisma/client'


type PostCardProps = {
    post: Post,
    user: User,    
}

export function PostCard(props: PostCardProps) {

    const { post, user } = props

  return (
    <div className="max-w-sm rounded overflow-hidden shadow">
        <Image
            src={post.imageUrl!}
            unoptimized
            alt=''
            width={350}
            height={200}            
        />                
        <div className="border-t-2 rounded-b lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div className="mb-8">
                {
                    post.price === 0 ?
                    (
                        <p className='text-xs text-gray-600'>Try free</p>
                    )
                    :
                    <p className="text-sm text-gray-600 flex items-center">
                        <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                        </svg>
                        Members only
                    </p>
                }
                <div className='group relative'>
                    <h3 className='mt-3 text-lg font-semibold leading-6 group-hover:text-gray-600'>
                        <Link
                            href={`/posts/${post.id}`}
                        >
                            {post.title}
                            <span className="absolute inset-0" />
                        </Link>
                    </h3>
                </div>
                <p className="text-base">{post.description}</p>
            </div>
            <div className="flex items-center space-x-4">
                <Avatar src={user.image || undefined} name={user.name!} />
                <div className="text-sm">
                    <p className="leading-none">{user.name}</p>                    
                </div>
            </div>
        </div>
    </div>
  )
}
