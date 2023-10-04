import React, { Suspense } from 'react'
import { Spinner } from '@/components/Chakra'
import { prisma } from '@/libs/db'
import { PostCard } from '@/components/PostCard'

export default async function page() {

    const posts = await prisma.post.findMany({
        where: {
            published: true
        },
        include: {
            categories: {
                include: {
                    category: true
                }
            }
        }
    })

  return (
    <section className='m-10 bg-white dark:bg-gray-900'>
        <div>
            <h2 className='mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white'>
                Find the post that thrills you
            </h2>
        </div>
        <div className=''>
            <div className='space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0'>
                { posts.map((post, key) => (
                    <Suspense
                        key={ key }
                        fallback={<Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />}
                    >
                        <PostCard
                            key={post.id}                            
                            id={ post.id }
                            title={ post.title || '' }
                            imageUrl={ post.imageUrl || ''}
                            description={post.description}
                            categories={post.categories.map((category) => ({
                                id: category.categoryId,
                                name: category.category.name
                            }))}
                        />
                    </Suspense>
                ))}
            </div>
        </div>
    </section>
  )
}
