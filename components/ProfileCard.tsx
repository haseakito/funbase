'use client'

import React, {
    useState,
    useEffect
} from 'react'
import { useSession } from 'next-auth/react'
import {
    useToast,
    Avatar,
    Button,    
} from '@chakra-ui/react'
import axios from 'axios'
import Link from 'next/link'


type ProfileCardProps ={
    userId: string,
    profileImage: string,
    name: string,
    bio: string,
}

export function ProfileCard(props: ProfileCardProps) {

    const { userId, profileImage, name, bio } = props

    // Side effect handling fetching the follow between the users
    useEffect(() => {
        const getFollow = async () => {
            await fetch(`/api/follow/${userId}`)
            .then((res) => {
                if (res.status === 200) {
                    setFollowed(true)
                }
            })
        }

        getFollow()
    }, [userId])

    // Boolean state handling the loading of following and unfollowing
    const [loading, setLoading] = useState(false)


    const [followed, setFollowed] = useState(false)

    // Hooks handling showing the toast
    const toast = useToast()

    // Hooks handling the user session
    const { data: session, status } = useSession()

    // Function handling following users
    const onFollow = async (userId: string) => {
        
        // Set the loading to be true while calling the API
        setLoading(true)

        await axios.post(`/api/follow/${userId}`)
        .then(() => {
            // Show the success toast
            toast({
                title: "Let's hang out!",
                description: `Successfully followed ${name}!`,
                status: 'success',
                duration: 3000,
                isClosable: true
            })
        })
        .catch((err) => {            
            // Show the error toast
            toast({                
                title: 'Ooops something went wrong!',
                description: err.message,
                status: 'error',
                duration: 3000,
                isClosable: true
            })
        })
        .finally(() => {
            // Set the loading to be false after executing the API request
            setLoading(false)
        })
    }

  return (
    <div className='w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>        
        <div className="flex flex-col items-center pb-10">
            <Avatar
                name={ name }
                src={ profileImage || undefined }                    
                size='xl'     
            />
            <h5 className='mt-3 mb-1 text-xl font-semibold text-gray-900 dark:text-white'>{ name }</h5>
            <span className='text-sm text-gray-500 dark:text-gray-400'>{ bio }</span>
            <div className='flex mt-4 space-x-3 md:mt-6'>
                <Button
                    isDisabled={userId === session?.user.id || followed}
                    onClick={() => onFollow(userId)}
                    isLoading={loading}
                    className='inline-flex items-center px-6 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                    Follow
                </Button>
                <Link                    
                    href={userId === session?.user.id ? '/profile' : `/users/${userId}`}
                    className='inline-flex items-center px-6 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700'
                >
                    Profile
                </Link>
            </div>
        </div>
    </div>
  )
}
