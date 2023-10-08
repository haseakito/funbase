import React, { Suspense } from 'react'
import { Spinner } from '@/components/Chakra'
import { prisma } from '@/libs/db'
import { PostCard } from './components/PostCard'
import { Categories } from './components/Categories'

interface PostPageProps {
    searchParams: {
        title: string,
        categoryId: string
    }
}

export default async function page({searchParams}: PostPageProps) {

    const posts = await prisma.post.findMany({
        where: {
            published: true,
            title: {
                contains: searchParams.title
            },
            categories: {
                every: {
                    categoryId: searchParams.categoryId
                }
            }
        },
        include: {
            categories: {
                include: {
                    category: true                    
                }
            },
            user: true
        }
    })

    const categories = await prisma.category.findMany()

  return (
    <section className='max-w-5xl mx-auto h-full p-5'>
        <Categories
            categories={categories}
        />
        <div>
            <h2 className='mb-4 text-2xl md:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white'>
                Find the post that thrills you
            </h2>
        </div>
        <div className=''>
            { posts.length === 0 && (
                <div className='flex justify-center items-center text-sm mt-10'>
                    No Posts Found yet
                </div>
            )}
            <div className='space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0 mt-10'>
                { posts.map((post, key) => (
                    <Suspense
                        key={ key }
                        fallback={<Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />}
                    >
                        <PostCard
                            post={post}
                            user={post.user}                            
                        />                 
                    </Suspense>
                ))}
            </div>
        </div>
    </section>
  )
}
