import React, { Suspense } from 'react'
import { authOptions } from '@/libs/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/libs/db'
import { Spinner } from '@/components/Chakra'
import { PostCard } from '@/components/PostCard'

export default async function page() {

  // Protect this API route by checking the session
  const session = await getServerSession(authOptions)

  // If user is not logged in, then redirect the user back
  if (!session) {
    redirect('/')
  }

  // Query the purchases history
  const purchases = await prisma.purchase.findMany({
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
      { purchases.length === 0 ? 
        <div className='flex justify-center items-center text-sm mt-10'>
          No Posts Found yet
        </div>
        :
        <div>
          { purchases.map((purchase, key) => (
            <Suspense
              key={key}
              fallback={<Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />}
            >
              <PostCard
                  key={purchase.post.id}                            
                  id={purchase.post.id }
                  title={purchase.post.title || '' }
                  imageUrl={purchase.post.imageUrl || ''}
                  description={purchase.post.description}
                  categories={purchase.post.categories.map((category) => ({
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
