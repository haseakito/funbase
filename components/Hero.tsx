import React from 'react'
import Logo from '@/public/Funbase.svg'
import Image from 'next/image'
import Link from 'next/link'

export function Hero() {
    return (
        <div className='mx-auto max-w-2xl'>
            <div className='flex justify-center'>
                <Image
                    src={Logo}
                    alt=''
                    className='w-[400px]'                                      
                />
            </div>
            <div className='mb-8 flex justify-center'>
                <div className='relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20'>
                    The very best quality and speed.
                    <Link
                        href="#testimonial"
                        className="pl-1 font-semibold text-indigo-600 hover:opacity-80 duration-300"
                    >
                        <span className="absolute inset-0" aria-hidden="true" />
                        Read more <span>→</span>
                    </Link>
                </div>
            </div>
            <div className='md:mt-20 text-center'>
                <h1>
                    The platform where <span className='text-transparent bg-clip-text font-bold bg-gradient-to-br from-purple-300 via-purple-400 to-purple-800'>creators</span> and <span className='text-transparent bg-clip-text font-bold bg-gradient-to-r from-pink-400 to-pink-600'>fans</span> can connect
                </h1>
                <p className='mt-2 text-lg leading-8 text-gray-600'>
                    Join the world of creators and help them succeed throughout their career. <span className='font-semibold text-transparent bg-clip-text bg-gradient-to-br from-yellow-600 to-red-600'>Creatives start with you</span>
                </p>
                <div className='mt-10 flex items-center justify-center gap-x-6'>
                    <Link
                        href='/auth/login'
                        className='relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'
                    >
                        <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>
                            Get tarted
                        </span>
                    </Link>
                    <Link
                        href='/blogs'
                        className='py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
                    >
                        Learn More <span>→</span>                        
                    </Link>
                </div>
            </div>
        </div>
    )
}