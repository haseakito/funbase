import React from 'react'
import Profile from '@/public/Profile.jpg'
import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/libs/format'
import { Blog } from '@/utils/types/Blog'

type BlogCardProps = {
    post: Blog
}

export function BlogCard(props: BlogCardProps) {

    const { id, image, title, tags, description, updatedAt } = props.post
    
  return (
    <div className='flex max-w-xl flex-col items-start justify-between'>
        <Image
            src={image.url}
            unoptimized
            alt=''
            width={400}
            height={400}
            className='rounded-lg shadow-sm'
        />
        <div className='mt-3 flex items-center gap-x-4 text-xs'>
            <time dateTime={updatedAt} className="text-gray-500">
                { formatDate(updatedAt) }
            </time>
            {
                tags.map((tag) => (
                    <span key={tag.id} className='relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100'>{tag.name}</span>
                ))
            }            
        </div>
        <div className="group relative">
            <h3 className="mt-3 text-lg font-semibold leading-6 group-hover:text-gray-600">
                <Link
                    href={`/blogs/${id}`}
                >
                    <span className="absolute inset-0" />
                    {title}
                </Link>
            </h3>
            <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{description}</p>
            <div className="relative mt-8 flex items-center gap-x-4">
                <Image
                    src={Profile}
                    alt=""
                    className="h-10 w-10 rounded-full bg-gray-50"
                />
                    <div className="text-sm leading-6">
                        <p className="font-semibold">
                            <a
                                href='https://github.com/haseakito'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                <span className="absolute inset-0" />
                                AKITO HASEGAWA
                            </a>
                        </p>
                        <p className="text-gray-600">Software engineer</p>
                    </div>
              </div>
        </div>
    </div>
  )
}
