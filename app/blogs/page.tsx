import React, { Suspense } from 'react'
import { client } from '@/libs/microcms'
import { BlogCard } from './components/BlogCard'
import { TagItem } from './components/TagItem'
import { Spinner } from '@/components/Chakra'

interface BlogPageProps {
    searchParams: {
        tagId: string
    }
}
export default async function page({searchParams}: BlogPageProps) {    

    let posts

    if (searchParams.tagId) {
        posts = await client.get({
            endpoint: 'blogs',
            queries: {
                filters: `tags[contains]${searchParams.tagId}`
            }
        })
        
    } else {
        posts = await client.get({
            endpoint: 'blogs'
        })
    }

    const tags = await client.get({
        endpoint: 'tags'
    })

  return (
    <div className="py-16 sm:py-24">        
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">From the blog</h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">
                    Learn how to grow your business with our expert advice.
                </p>
                <div className='mt-5 flex items-center gap-x-4 overflow-x-auto pb-2'>
                    { tags.contents.map((tag: any) => (
                        <TagItem
                            key={tag.id}
                            tagId={tag.id}
                            name={tag.name}
                            image={tag.image.url}
                        />
                    ))}
                </div>
            </div>        
            <div className='mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
                {
                    posts.contents.map((post: any) => (
                        <Suspense
                            key={post.id}
                            fallback={<Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />}
                        >
                            <BlogCard
                                key={post.id}
                                post={post}
                            />
                        </Suspense>                        
                    ))}
            </div>
        </div>
    </div>
  )
}
