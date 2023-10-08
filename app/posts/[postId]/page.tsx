import React from 'react'
import { prisma } from '@/libs/db'
import { Alert, AlertIcon } from '@/components/Chakra'
import { PurchaseButton } from './components/PurchaseButton'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/libs/auth'
import { VideoPlayer } from './components/VideoPlayer'
import { Description } from './components/Description'


export default async function page({ params } : { params: { postId: string } }) {
    // Protect this page by checking the session
    const session = await getServerSession(authOptions)

    // If user is not logged in, then return an error
    if (!session) {
        throw new Error("Unauthorized to perform this action")
    }

    // Query the purchase history with userId and postId provided
    const purchase = await prisma.purchase.findUnique({
        where: {
            userId_postId: {
                userId: session.user.id,
                postId: params.postId
            }
        }
    })

    // Query the post with the postId provided
    const post = await prisma.post.findUnique({
        where: {
            id: params.postId,
            published: true
        },
        include: {
            user: true,
            muxData: true
        }
    })

    // If there's no post for this postId, return an error
    if (!post) {
        throw new Error('Post Not Found')
    }
    
    // Query the likes for this post
    const likes = await prisma.like.findMany()

    // Query the like with the userId and postId provided
    const like = await prisma.like.findUnique({
        where: {
            userId_postId: {
                userId: session.user.id,
                postId: params.postId
            }
        }
    })

    // Boolean state handling if the user has already purchased the post to give permission to view the post
    const isLocked = !purchase
    // Boolean state handling if the post belongs the user
    const isOwned =  session.user.id === post.userId

  return (
    <div className='max-w-5xl mx-auto h-full p-5'>
        { isLocked || !isOwned ? (
            <Alert mt={5} status='warning'>
                <AlertIcon />
                You have to purchase this port in order to view it
            </Alert>
        )
            :
            null
        }
        <div className='flex flex-col max-w-4xl mx-auto pb-20'>
            <div className='p-4'>
                <VideoPlayer
                    title={post.title}
                    isLocked={isLocked}
                    isOwned={isOwned}
                    playbackId={post.muxData?.playbackId!}
                />
            </div>            
            <div className='p-4 flex flex-col md:flex-row justify-between items-center'>
                <h2 className='text-2xl font-semibold mb-2'>{ post.title }</h2>
                <PurchaseButton
                    postId={post.id!}
                    price={post.price!}
                />
            </div>
            <div className=''>                
                <Description
                    postId={post.id!}
                    isOwned={isOwned}
                    description={post.description!}
                    user={post.user}
                    like={like}
                    likesCount={likes.length}
                    updatedAt={post.updatedAt}                    
                />
            </div>
        </div>
    </div>
  )
}
