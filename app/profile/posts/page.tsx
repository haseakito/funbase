import React, { Suspense } from 'react'
import { authOptions } from '@/libs/auth'
import { getServerSession } from 'next-auth'
import { prisma } from '@/libs/db'
import { PostSetup } from '@/components/PostSetup'
import { PostCard } from '@/components/PostCard'
import { Spinner } from '@/components/Chakra'

export default async function page() {

  const session = await getServerSession(authOptions)

  if (!session?.user) {
    throw new Error
  }

  const posts = await prisma.post.findMany({
    where: {
      userId: session.user.id
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
    <div className='max-w-5xl mx-auto h-full p-6'>
      <div>
        <h1 className='text-2xl'>
          Create a new post
        </h1>
        <p className='text-sm text-slate-600'>
          What would you like to name your post?
        </p>
        <PostSetup />
      </div>
      <div className='mt-10'>
        <h1 className='text-2xl'>
          Posts Collection    
        </h1>
        <p className='text-sm text-slate-600 mt-2'>
          What would you like to name your post?
        </p>        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-3'>    
          {
            posts.map((value, key) => (         
              <Suspense
                  key={ key }
                  fallback={<Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />}
              >     
                <PostCard                  
                  id={value.id}
                  title={value.title}
                  description={value.description}
                  imageUrl={value.imageUrl || ''}
                  categories={value.categories.map((category) => ({
                    id: category.categoryId,
                    name: category.category.name || ''
                  }))}
                />
            </Suspense>
            ))
          }
        </div>      
      </div>
    </div>
  )
}
