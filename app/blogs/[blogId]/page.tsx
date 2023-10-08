import React from 'react'
import { Blog, Tag } from '@/utils/types/Blog'
import { client } from '@/libs/microcms'
import styles from './styles/Blog.module.scss'
import { formatDate } from '@/libs/format'
import Profile from '@/public/Profile.jpg'
import Image from 'next/image'
import Link from 'next/link'

export default async function page({ params }: { params: { blogId: string }}) {

    const post: Blog = await client.get({
      endpoint: 'blogs',
      contentId: params.blogId,
    })

    const newPosts = await client.get({
      endpoint: 'blogs',
      queries: {
        limit: 5
      }
    })

  return (
    <div className='py-16 sm:py-24'>
      <div className='max-w-full mx-auto px-6 lg:px-8'>
        <div className='text-4xl font-bold text-center'>{post.title}</div>        
          <p className='flex justify-end text-sm text-slate-600 hover:underline'>Last Updated: {formatDate(post.updatedAt)}</p>
          <p className='flex justify-end text-sm text-slate-600'>Edited by <a href='https://github.com/haseakito' target='_blank' rel='noopener noreferrer' className='hover:underline'>@haseakito</a></p>        
        <Image
          src={post.image.url}
          unoptimized
          width={1920}
          height={1080}
          alt=''
          className='rounded-lg mt-5 shadow-sm'
        />
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-x-5'>
          <div className='col-span-2'>
            <div className='mt-5 flex items-center gap-x-4'>
              { post.tags.map((tag) => (
                <div
                  key={tag.id}
                  className='rounded-full flex items-center py-2 px-4 text-sm border border-slate-200 gap-x-1 hover:border-sky-700 transition'
                >
                  <Image
                    src={tag.image.url}
                    unoptimized
                    width={8}
                    height={8}
                    alt=''                    
                />
                  {tag.name}
                </div>
              ))}
            </div>          
            <div className=''>            
              <div
                dangerouslySetInnerHTML={{
                  __html: `${post.content}`
                }}
                className={styles.post}
              ></div>
            </div>
          </div>
          <div>
            <div className='lg:flex lg:justify-center lg:items-center py-10'>
              <div className='bg-gray-100 rounded-xl p-5'>
                <h3 className='text-2xl font-semibold text-center'>About Me</h3>
                <div className='flex flex-col items-center'>
                  <Image
                    src={Profile}
                    alt=''
                    width={300}
                    height={300}
                    className='rounded-lg shadow-sm mt-5'
                  />                
                  <p className='mt-5 text-sm font-medium text-black'>
                    Software engineer👾 and an Entrepreneur🚀. Mainly skilled in 💙Typescript, 🦅Nextjs, 💎Ruby on Rails, 🐟Python, 🧪Golang. Coffee addict☕ and Sports lover🏄
                  </p>                
                </div>
              </div>
            </div>
            <div>
              <h2>Latest News</h2>
              { newPosts.contents.map((post: Blog) => (
                <div
                  key={post.id}                  
                >
                  <h3 className='text-2xl font-bold hover:underline'>{post.title}</h3>
                  <p className='mt-3 text-sm text-slate-600'>{post.description}</p>
                  <div className='mt-5 flex items-center justify-between'>
                    <div className='flex items-center gap-x-2'>
                      <Image
                        src={Profile}
                        alt=''
                        width={50}
                        height={50}
                        className='rounded-full'
                      />
                      <p className='font-semibold'>AKITO HASEGAWA</p>
                    </div>
                    <Link
                      href={`/blogs/${post.id}`}
                      className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                    >
                      Read more
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
