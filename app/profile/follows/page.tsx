import React from 'react'
import { authOptions } from '@/libs/auth'
import { getServerSession } from 'next-auth'
import { prisma } from '@/libs/db'
import { StackedList } from './components/StackedList'


export default async function page() {

  const session = await getServerSession(authOptions)

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id
    },
    include: {
      followers: {
        include: {
          follower: true
        }
      },
      following: {
        include: {
          following: true
        }
      }
    }
  })

  return (
    <div className='max-w-5xl mx-auto h-full p-6'>
      <div className='mt-14 grid grid-cols-1 md:grid-cols-2'>        
        {
          user?.followers.length === 0 ?
          <p>No Followers Found</p>
          :
          user?.followers && (
            <StackedList
              users={user?.followers.map((follower) => ({
                userId: follower.followerId,
                name: follower.follower.name || '',
                email: follower.follower.email || '',
                image: follower.follower.image || ''
              }))}
            />
          )
        }        
        {
          user?.following.length === 0 ?
          <p>You are not following anyone</p>
          :
          user?.following && (
            <StackedList
              users={user?.following.map((following) => ({
                userId: following.followingId,
                name: following.following.name || '',
                email: following.following.email || '',
                image: following.following.image || ''
              }))}
            />
          )
        }
      </div>
    </div>
  )
}
