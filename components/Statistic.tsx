import React from 'react'
import Fire from '@/public/Fire.svg'
import Raindrop from '@/public/Raindrop.svg'
import Lightbulb from '@/public/Lightbulb.svg'
import Image from 'next/image'

export function Statistic() {
    return (
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="mx-auto">
                <h2 id='statistic' className="group flex justify-center gap-3 mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
                    <span>Trusted by creators around the world</span>
                    <a href='#statistic' className='ml-2 text-blue-700 opacity-0 transition-opacity dark:text-blue-500 group-hover:opacity-100'>#</a>
                </h2>
                <p className="mb-8 font-light text-gray-500 lg:mb-16 text-center sm:text-xl dark:text-gray-400">
                    Learn the fact and get the good picture of Funbase
                </p>
            </div>
            <div className="grid gap-10 row-gap-8 lg:grid-cols-3">
                <div>
                    <div className="flex">
                        <h6 className="mr-2 text-4xl font-bold md:text-5xl text-deep-purple-accent-400">
                            78K
                        </h6>
                        <div className="flex items-center justify-center rounded-full bg-teal-accent-400 w-7 h-7">
                            <Image
                                src={Fire}
                                alt=''
                                className='w-7'
                            />
                        </div>
                    </div>
                    <p className="mb-2 font-bold md:text-lg">Active Users</p>
                    <p className="text-gray-700">
                        More and more creators choosing this platform to reach their audience.
                        Growing popularity proves what we offer on Funbase!
                    </p>
                </div>
                <div>
                    <div className="flex">
                        <h6 className="mr-2 text-4xl font-bold md:text-5xl text-deep-purple-accent-400">
                            3.4K
                        </h6>
                        <div className="flex items-center justify-center rounded-full bg-teal-accent-400 w-7 h-7">
                            <Image
                                src={Lightbulb}
                                alt=''
                                className='w-7'
                            />
                        </div>
                    </div>
                    <p className="mb-2 font-bold md:text-lg">Subscribers</p>
                    <p className="text-gray-700">
                        Funbase has the greatest and largest ecosystem for creators and fans.
                        Enjoy tryout period and take a bite of Funbase!
                    </p>
                </div>
                <div>
                    <div className="flex">
                        <h6 className="mr-2 text-4xl font-bold md:text-5xl text-deep-purple-accent-400">
                            32M
                        </h6>
                        <div className="flex items-center justify-center rounded-full bg-teal-accent-400 w-7 h-7">
                            <Image
                                src={Raindrop}
                                alt=''
                                className='w-7'
                            />
                        </div>
                    </div>
                    <p className="mb-2 font-bold md:text-lg">Transactions</p>
                    <p className="text-gray-700">
                        We hit the record high transactions.
                        Funbase providing rewards for both creators and fans that support us throughout all this time!
                    </p>
                </div>
            </div>
        </div>
    )
}
