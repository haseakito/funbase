'use client'

import React from 'react'
import { User } from '@prisma/client'
import { formatDate } from '@/libs/format'
import {
    Avatar,
} from '@chakra-ui/react'

type DescriptionProps = {
    postId: string
    description: string
    user: User
    updatedAt: Date
}
export function Description(props: DescriptionProps) {

    const { postId, description, user, updatedAt } = props

  return (
    <div className='p-4'>
        <p className='flex justify-start text-sm hover:underline'>Last Updated: {formatDate(updatedAt.toString())}</p>
        <div className='flex justify-start items-center gap-x-2'>
            <Avatar
                src={user.image || undefined}
                name={user.name || ''}
                size='sm'
            />
            <p className='font-semibold'>{user.name || ''}</p>
        </div>        
        <div className='mt-10'>            
            <h2 className='text-sm italic'>Post description</h2>
            <p className='p-2 font-medium'>{description}</p>
        </div>
    </div>
  )
}
