import React from 'react'
import Logo from '@/public/Funbase.svg'
import Image from 'next/image'

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
                    <a href="#" className="pl-1 font-semibold text-indigo-600 hover:opacity-80 duration-300">
                        <span className="absolute inset-0" aria-hidden="true" />
                        Read more <span>&rarr;</span>
                    </a>
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
                    <button className='bg-blue-400 p-4 rounded hover:rounded-none font-semibold shadow-sm hover:opacity-90 duration-300 focus:outline-1 '>
                        Get tarted
                    </button>
                    <a className='relative group  text-sm font-semibold leading-6 text-gray-900 cursor-pointer'>
                        Learn More <span>→</span>
                        <span className='h-1 absolute bottom-0 left-1/2 w-0 bg-black dark:bg-white transition-all duration-500 group-hover:w-1/2'></span>
                        <span className='h-1 absolute bottom-0 right-1/2 w-0 bg-black dark:bg-white transition-all duration-500 group-hover:w-1/2'></span>
                    </a>
                </div>
            </div>
        </div>
    )
}