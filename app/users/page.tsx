import React, { Suspense } from 'react'
import { Spinner } from '@/components/Chakra'
import { ProfileCard } from '@/components/ProfileCard'

export default function page() {

    const ProfileCardData = [
        {
            id: '',
            username: 'David Johnson',
            profileImage: '',
            description: 'Glad to see you'
        }
    ]
  return (
    <section className='m-10 bg-white dark:bg-gray-900'>
        <div>
            <h2 className='mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white'>
                Trending Hot🔥 
            </h2>
        </div>
        <div className=''>
            <div className='space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0'>
                { ProfileCardData.map((value, key) => (
                    <Suspense
                        key={ key }
                        fallback={<Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />}
                    >
                        <ProfileCard                            
                            id={ value.id }
                            username={ value.username }
                            profileImage={ value.profileImage }
                            description={ value.description }
                        />
                    </Suspense>
                ))}
            </div>
        </div>
    </section>
  )
}
