import React from 'react' 
import Image from 'next/image'
import Link from 'next/link'
import { Tag } from './Tag'

type PostCardProps = {
    id: string,
    title: string,    
    description: string | null,
    imageUrl: string,
    categories: {id: string, name: string}[]
}

export function PostCard(props: PostCardProps) {

    const { id, title, description, imageUrl, categories } = props

  return (
    <div className="max-w-lg rounded overflow-hidden shadow-sm border-2">
        <Image
            src={imageUrl || ''}
            className="w-full" 
            alt=""
        />
        <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base">
                    { description }
                </p>
        </div>
        <div className='p-5'>
            <Link
                href={`/profile/posts/${id}`}
                className='inline-flex items-center px-5 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
                Edit post
                <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </Link>
        </div>
        <div className='px-6 pt-4 pb-2'>
            {
                categories.length !== 0 && (
                    categories.map((category) => (
                        <Tag
                            key={category.id}
                            name={category.name}
                        />
                    ))
                )
            }             
        </div>
    </div>
  )
}
