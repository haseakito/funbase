import React, { Suspense } from 'react'
import { Spinner } from '@/components/Chakra'
import { ProfileCard } from '@/components/ProfileCard'
import { User } from '@/utils/types/User'

/**
 * Asynchronous function handling getting multiple users
 *  
 * @returns Array of user obejct
 */
async function getUsers() {
    // Query the users
    const res = await fetch('http://localhost:3000/api/user')    

    // Check the response status
    if (!res.ok) {
        // Redirect to the error.ts
        throw new Error
    }
        // Parse the json body
        const users = await res.json()
    return users
}

export default async function page() {

    // Fetch multiple users
    const users: User[] = await getUsers()

  return (
    <section className='m-10 bg-white dark:bg-gray-900'>
        <div>
            <h2 className='mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white'>
                Creators just for you
            </h2>
        </div>
        <div className=''>
            <div className='space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0'>
                { users.map((value, key) => (
                    <Suspense
                        key={ key }
                        fallback={<Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />}
                    >
                        <ProfileCard                            
                            id={ value.id }
                            name={ value.name }
                            profileImage={ value.image }
                            description=''
                        />
                    </Suspense>
                ))}
            </div>
        </div>
    </section>
  )
}
