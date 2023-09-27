import React from 'react'
import RegisterForm from '@/components/RegisterForm'
import Image from 'next/image'
import Logo from '@/public/Funbase.svg'
import Card from '@/public/Card.svg'
import Cloud from '@/public/Cloud.svg'
import Fire from '@/public/Fire.svg'

export default function page() {

    const FeatureData = [
        {
            title: 'One month free',
            icon: Card,
            description: 'Trial period offered for the first time. You can explore the our dynamic economy of creatives'
        },
        {
            title: 'Subscription',
            icon: Cloud,
            description: 'Super easy to use this platform both as a creator and a user. We handle payment, campaign, and products upload.'
        },
        {
            title: 'User experience',
            icon: Fire,
            description: 'Our greatest enemy is high latency. We always seek for a way to improve user experiences both for creators and fans.'
        }
    ]
    return (
        <div className='h-full grid md:grid-cols-2 gap-10 mt-10 mx-3 lg:mx-20'>
            <section className='bg-white dark:bg-slate-900 mt-10'>
                <Image
                    src={Logo}
                    alt=''
                    className='w-24'
                />
                <div>
                    <h2 className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                        Sign up for absolutely nothing
                    </h2>
                    <p className='mt-6 text-lg leading-8 text-gray-600'>
                        Join now the world of creators and get connected with your heros! And explore your infinate possibilities with us!
                    </p>
                    <dl className='mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none'>
                        {FeatureData.map((value, key) => (
                            <div
                                key={key}
                                className='relative pl-9'
                            >
                                <dt className="inline font-semibold text-gray-900">
                                    <Image
                                        src={value.icon}
                                        alt=''
                                        className="absolute left-1 top-1 h-6 w-6 text-indigo-600"
                                    />
                                    {value.title}
                                </dt>{' '}
                                <dd className="inline">{value.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>
            <section className='max-w-2xl bg-white dark:bg-slate-900 rounded border shadow p-10'>
                <h1 className='text-center text-3xl font-bold '>
                    Sign up
                </h1>
                <RegisterForm />
            </section>
        </div>
    )
}
