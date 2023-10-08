'use client'

import React, { useState } from 'react'
import { Like, User } from '@prisma/client'
import { formatDate } from '@/libs/format'
import {
    Avatar,
    Button,
    Icon,
    useToast,
} from '@chakra-ui/react'
import { FaHeart } from 'react-icons/fa'
import axios from 'axios'
import { useRouter } from 'next/navigation'

type DescriptionProps = {
    postId: string
    isOwned: boolean
    description: string
    user: User  
    like: Like | null
    likesCount: number
    updatedAt: Date
}

export function Description(props: DescriptionProps) {

    const { postId, isOwned, description, user, like, likesCount, updatedAt } = props

    // Boolean state handling the loading for api call
    const [loading, setLoading] = useState(false)

    // Hooks handling the router
    const router = useRouter()

    // Hooks handling showing the toast
    const toast = useToast()

    // Function handling liking the post
    const onLike = async () => {
        // Start API call
        setLoading(true)

        // Send post request to the server
        await axios.post(`/api/post/${postId}/`)
        .then(() => {
            // Show the success toast
            toast({
                title: 'Success',
                description: 'Successfully liked a new post!',
                status: 'success',
                variant: 'top-accent',
                duration: 3000,
                isClosable: true,
                position: 'top'
            })

            router.refresh()
        })
        .catch((err) => {
            // Show the failure toast
            toast({
                title: 'Ooops something went wrong!',
                description: err,
                status: 'error',
                variant: 'top-accent',
                duration: 3000,
                isClosable: true,
                position: 'top'
            }) 
        })
        .finally(() => {
            setLoading(false)
        })
    }

    // Function handling unliking the post
    const onUnlike = async () => {
        // Start API call
        setLoading(true)

        // Send post request to the server
        await axios.post(`/api/post/${postId}/`)
        .then(() => {
            // Show the success toast
            toast({
                title: 'Success',
                description: 'Successfully unliked a new post!',
                status: 'success',
                variant: 'top-accent',
                duration: 3000,
                isClosable: true,
                position: 'top'
            })

            router.refresh()
        })
        .catch((err) => {
            // Show the failure toast
            toast({
                title: 'Ooops something went wrong!',
                description: err,
                status: 'error',
                variant: 'top-accent',
                duration: 3000,
                isClosable: true,
                position: 'top'
            }) 
        })
        .finally(() => {
            setLoading(false)
        })   
    }

  return (
    <div className='p-4'>
        <div className='flex  justify-between items-center'>
            <p className='text-sm hover:underline'>Last Updated: {formatDate(updatedAt.toString())}</p>
            <div className='flex items-center gap-x-2'>
                <Avatar
                    src={user.image || undefined}
                    name={user.name || ''}
                    size='sm'
                />
                <p className='font-semibold'>{user.name || ''}</p>
            </div>
            <div className='flex items-center gap-x-3'>
                {
                    like ?
                    <Button
                        variant='outline'
                        colorScheme='gray'
                        onClick={onLike}
                        isDisabled={isOwned}
                        isLoading={loading}
                    >
                        <Icon as={FaHeart}  />
                    </Button>
                    :
                    <Button
                        variant='outline'
                        colorScheme='pink'
                        onClick={onUnlike}
                        isDisabled={isOwned}
                        isLoading={loading}
                    >
                        <Icon as={FaHeart} />
                    </Button>
                }
                <p className='text-sm'>{likesCount}</p>
            </div>
        </div>
        <div className='mt-10'>            
            <h2 className='text-sm italic'>Post description</h2>
            <p className='p-2 font-medium'>{description}</p>
        </div>
    </div>
  )
}
