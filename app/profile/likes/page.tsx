import React, { Suspense } from 'react'
import { authOptions } from '@/libs/auth'
import { getServerSession } from 'next-auth'
import { prisma } from '@/libs/db'
import { redirect } from 'next/navigation'
import { Spinner } from '@/components/Chakra'
import { PostCard } from '@/components/PostCard'

export default async function page() {

  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/')
  }

  const likes = await prisma.like.findMany({
    where: {
      userId: session.user.id
    },
    include: {
      post: {
        include: {
          categories: {
            include: {
              category: true
            }
          }
        }
      }
    }
  })

  return (
    <div className='max-w-5xl mx-auto h-full p-6'>
      { likes.length === 0 ? 
        <div className='flex justify-center items-center text-sm mt-10'>
          No Posts Found yet
        </div>
        :
        <div>
          { likes.map((like) => (
            <Suspense
              key={like.postId}
              fallback={<Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />}
            >
              <PostCard                  
                  id={like.postId }
                  title={like.post.title || '' }
                  imageUrl={like.post.imageUrl || ''}
                  description={like.post.description}
                  categories={like.post.categories.map((category) => ({
                      id: category.categoryId,
                      name: category.category.name
                  }))}
              />
            </Suspense>
          ))}
        </div>
      }
    </div>
  )
}
