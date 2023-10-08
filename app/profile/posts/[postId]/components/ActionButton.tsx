'use client'

import React, { useState } from 'react'

import { MdDelete } from 'react-icons/md'
import { Button, Icon, useToast } from '@chakra-ui/react'
import { Popup } from '@/components/Popup'
import axios from 'axios'
import { useRouter } from 'next/navigation'

type ActionButtonProps = {
  postId: string,
}

export function ActionButton(props: ActionButtonProps) {

  const { postId } = props

  const [popupOpen, setPopupOpen] = useState(false)

  // Hooks handling the router
  const router = useRouter()

  // Hooks handling showing the toast
  const toast = useToast()

  const bodyContent = (
    <div>
      Are you sure you want to delete this post?
    </div>
  )

  const onDelete = async () => {
    await axios.delete(`/api/post/${postId}`)
    .then(() => {
      // Show the success toast
      toast({
          title: 'Success',
          description: 'Successfully created a new post!',
          status: 'success',
          variant: 'top-accent',
          duration: 3000,
          isClosable: true,
          position: 'top'
      })

      router.push('/profile/posts')
    })
    .catch((err) => {
        // Show the failure toast
        toast({
            title: 'Ooops something went wrong!',
            description: err,
            status: 'error',
            variant: 'top-accent',
            duration: 3000,
            isClosable: true,
            position: 'top'
        }) 
    })
  }

  return (
    <div>
      <div>        
        <Button
            onClick={() => setPopupOpen(true)}
        >
            <Icon as={MdDelete} boxSize={30} />
        </Button>
      </div>
      <Popup
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
        bodyContent={bodyContent}
        action={() => onDelete()}
        actionLabel='Yes, delete'
      />
    </div>
  )
}
