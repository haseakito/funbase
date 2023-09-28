import React from 'react'
import { LoginForm } from '@/components/LoginForm'
import Image from 'next/image'
import Logo from '@/public/Funbase.svg'
import Cloud from '@/public/Cloud.svg'
import Database from '@/public/Database.svg'
import Thunder from '@/public/Thunder.svg'

export default function page() {    

    const FeatureData = [
        {
            title: 'Cloud solution',
            icon: Cloud,
            description: 'We cloud technology to drastically reduce cost so that we can give our valuable clients back what we earned!'
        },
        {
            title: 'Low latency',
            icon: Thunder,
            description: 'Streaming videos with as low latency and stress as possible! Just make yourself at home on Funbase!'
        },
        {
            title: 'Database backups',
            icon: Database,
            description: 'We make sure your data is securely stored. Uploading products for your fan on Funbase is the best solution!'
        }
    ]

    return (
        <div className='h-full grid md:grid-cols-2 gap-10 mt-10 mx-3 lg:mx-20'>
            <section className='bg-white dark:bg-slate-900 lg:mt-10'>
                <Image
                    src={Logo}
                    alt=''
                    className='w-24'
                />
                <div>
                    <h2 className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                        Sign up for absolutely free
                    </h2>
                    <p className='mt-6 text-lg leading-8 text-gray-600'>
                        Join now the world of creators and get connected with your heros! And explore your infinate possibilities with us!
                    </p>
                    <dl className='mt-16 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none'>
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
            <section className='max-w-2xl bg-white dark:bg-slate-900 mt-10 rounded border shadow p-10'>
                <h1 className='text-center text-3xl font-bold '>
                    Login
                </h1>
                <LoginForm />
            </section>
        </div>
    )
}
