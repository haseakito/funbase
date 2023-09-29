'use client'

import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import {
    useToast,
    Avatar,
    Button,    
} from '@chakra-ui/react'
import axios from 'axios'
import Link from 'next/link'


type ProfileCardProps ={
    id: string,
    profileImage: string,
    name: string,
    description: string,
}
export function ProfileCard(props: ProfileCardProps) {

    const { id, profileImage, name, description } = props

    // Boolean state handling the loading of following and unfollowing
    const [loading, setLoading] = useState(false)

    // Hooks handling showing the toast
    const toast = useToast()

    // Hooks handling the user session
    const { data: session, status } = useSession()

    const onFollow = async (id: string) => {
        
        // Set the loading to be true while calling the API
        setLoading(true)

        await axios.post(`/api/follow/${id}`)
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
                title: err.message,
                description: 'Ooops something went wrong!',
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
        <div className='flex justify-end px-4 pt-4'>                       
            {/* Dropdown Menu */}
            <div id="dropdown" className='z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700'>
                <ul className='py-2' aria-labelledby="dropdownButton">
                    <li>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export Data</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                    </li>
                </ul>
            </div>
        </div>
        <div className="flex flex-col items-center pb-10">
            <Avatar
                name={ name }
                src={ profileImage }                    
                size='xl'     
            />
            <h5 className='mt-3 mb-1 text-xl font-semibold text-gray-900 dark:text-white'>{ name }</h5>
            <span className='text-sm text-gray-500 dark:text-gray-400'>{ description }</span>
            <div className='flex mt-4 space-x-3 md:mt-6'>
                <Button
                    disabled={id === session?.user.id}
                    onClick={() => onFollow(id)}
                    isLoading={loading}
                    className='inline-flex items-center px-6 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                    Follow
                </Button>
                <Link                    
                    href={id === session?.user.id ? '/profile' : `/user/${id}`}
                    className='inline-flex items-center px-6 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700'
                >
                    Profile
                </Link>
            </div>
        </div>
    </div>
  )
}
