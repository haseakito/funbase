'use client'

import React, { useState } from 'react'
import {
    Avatar,
    Button,
    Stack,
    useToast
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { FileUpload } from '@/components/FileUpload'
import { Popup } from '@/components/Popup'
import axios from 'axios'

type AvatarFormProps = {
    userId: string,
    name: string,
    imageUrl: string
}

export function AvatarForm(props: AvatarFormProps) {

    const { userId, name, imageUrl } = props

    // Boolean state handling opening the modal
    const [modalOpen, setModalOpen] = useState(false)

    // Hooks handling the router
    const router = useRouter()

    // Hooks handling showing the toast
    const toast = useToast()

    // Asynchronous function handling updating the user profile image
    const onSubmit = async (imageUrl: string) => {
        await axios.patch(`/api/user/${userId}`, {
            image: imageUrl
        })
        .then(() => {            
            // Show the success toast
            toast({
                title: 'Success',
                description: 'Successfully deleted an account!',
                status: 'success',
                duration: 3000,
                isClosable: true
            })

            // Refresh the page to load the new data
            router.refresh()
        })
        .catch(() => {            
            // Show the failure toast
            toast({
                title: 'Internal Server Error',
                description: 'Ooops something went wrong!',
                status: 'error',
                duration: 3000,
                isClosable: true
            })
        })
    }

    const bodyContent = (
        <div>
            <p className='text-lg font-semibold'>Upload profile image</p>
            <FileUpload
                endpoint='profileImage'
                onChange={(url) => {
                    if (url) {
                        onSubmit(url)
                    }
                }}
            />
        </div>
    )

  return (
    <div className='flex items-center gap-x-10'>
        <Avatar
            size='xl'
            name={name || ''}
            src={imageUrl ||  ''}
        />
        <Stack>
            <Button
                variant='outline'
                colorScheme='gray'
                onClick={() => setModalOpen(true)}
            >
                Change avatar
            </Button>
            <p className='text-center text-xs text-slate-600'>
                JPG, GIF or PNG. 1MB max.
            </p>
        </Stack>
        <Popup
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            bodyContent={bodyContent}
            action={() => setModalOpen(false)}
            actionLabel='upload'
        />
    </div>
  )
}
