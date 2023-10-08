'use client'

import React, { Suspense } from 'react'
import { Button, Spinner } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

type StackedListProps = {
    users: { userId: string, name: string, image: string, email: string }[]
}

export function StackedList(props: StackedListProps) {

    const { users } = props

    const router = useRouter()

  return (
    <ul className='divide-y divide-gray-100'>
        { users.map((user, key) => (
        <li key={key} className="flex justify-between gap-x-6 py-5">
            <Suspense
                fallback={<Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />}
            >
                <div className="flex min-w-0 gap-x-4">
                    <Image
                        src={user.image}
                        alt="" 
                        className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    />
                    <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{user.name}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{user.email}</p>
                    </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <Button
                        onClick={() => router.push(`/users/${user.userId}`)}
                    >
                        See posts
                    </Button>
                </div>
            </Suspense>
        </li>
        ))
        }
    </ul>
  )
}
