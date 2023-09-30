import { Subscription } from '@/components/Subscription'
import { prisma } from '@/libs/db'
import React from 'react'

export default async function page({ params } : { params: { userId: string } }) {

    // Fetch the specific user
    const user = await prisma.user.findUnique({
        where: {
            id: params.userId
        }
    })
    
    const SubscriptionData = [
        {
            id: '1',
            title: 'Starter',
            price: 20,
            description: 'Best option for personal use & for your next project.'
        }
    ]
  return (
    <section className='bg-white dark:bg-gray-900'>
        <div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
            <div className='mx-auto max-w-screen-md text-center mb-8 lg:mb-12'>
                <h2 className='mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white'>
                    Subscription Plans
                </h2>
                <p className='mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400'>
                    Subscribe as many as you want! Creators thrive, and you're happy too!
                </p>
            </div>
        </div>
        <div className='space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0'>
            { SubscriptionData.map((value, key) => (
                <Subscription
                    key={ key }
                    id={ value.id }
                    title={ value.title }
                    price={ value.price }
                    description={ value.description }
                />
            ))}
        </div>
        {/* Post */}
    </section>
  )
}