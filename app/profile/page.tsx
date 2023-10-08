import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/libs/auth'
import { AvatarForm }from './components/AvatarForm'
import { ProfileForm } from './components/ProfileForm'
import { redirect } from 'next/navigation'
import { Divider } from '@/components/Chakra'
import { PasswordForm } from './components/PasswordForm'
import { DeleteForm } from './components/DeleteForm'
import { prisma } from '@/libs/db'


export default async function page() {

  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/')
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id
    }
  })

  if (!user) {
    redirect('/')
  }
     
  return (
    <div className='max-w-5xl mx-auto h-full p-6'>
      <div className='mt-14 grid grid-cols-1 md:grid-cols-2'>
        <div>
          <h1 className='font-bold text-xl'>
            Personal Information
          </h1>
          <p className='text-sm text-slate-600'>
            Update your profile
          </p>
        </div>
        <div className='mt-5 md:mt-0 space-y-5'>
          <AvatarForm
            userId={user.id}
            name={user.name || ''}
            imageUrl={user.image || ''}
          />
          <ProfileForm
            userId={user.id}
            name={user.name || ''}
            bio={user.bio || ''}
            email={user.email || ''}
          />
        </div>
      </div>
      <Divider mt={'14'} />
      <div className='mt-14 grid grid-cols-1 md:grid-cols-2'>
        <div>
          <h1 className='font-bold text-xl'>
            Change Password
          </h1>
          <p className='text-sm text-slate-600'>
            Update your password associated with your acount
          </p>
        </div>
        <div className='mt-5 md:mt-0 '>
          <PasswordForm
            userId={user.id}            
          />
        </div>
      </div>
      <Divider mt={'14'} />
      <div className='mt-14 grid grid-cols-1 md:grid-cols-2'>
        <div>
          <h1 className='font-bold text-xl'>
            Delete account
          </h1>
          <p className='text-sm text-slate-600'>
            Note that this action is not reversible. All Information
            related to this account will be deleted permanently
          </p>
        </div>
        <div className='mt-5 md:mt-0'>
          <DeleteForm
            userId={user.id}
          />
        </div>
      </div>
    </div>
  )
}
