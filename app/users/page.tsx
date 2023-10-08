import React, { Suspense } from 'react'
import { prisma } from '@/libs/db'
import { Spinner } from '@/components/Chakra'
import { ProfileCard } from '@/components/ProfileCard'

export default async function page() {

    // Fetch multiple users
    const users = await prisma.user.findMany()

  return (
    <section className='max-w-5xl mx-auto h-full p-5'>
        <div>
            <h2 className='mt-5 mb-4 text-2xl md:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white'>
                Creators just for you
            </h2>
        </div>
        <div className=''>
            <div className='space-y-8 grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0'>
                { users.map((user) => (
                    <Suspense
                        key={ user.id }
                        fallback={<Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />}
                    >
                        <ProfileCard
                            key={user.id}                            
                            userId={ user.id }
                            name={ user.name || '' }
                            profileImage={ user.image!}
                            bio={user.bio || ''}
                        />
                    </Suspense>
                ))}
            </div>
        </div>
    </section>
  )
}
