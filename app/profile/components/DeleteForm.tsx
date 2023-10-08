'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
    MdOutlineQuestionMark
} from 'react-icons/md'
import {
    Button,
    Icon,
    useToast
} from '@chakra-ui/react'
import { Popup } from '@/components/Popup'
import axios from 'axios'

type DeleteFormProps = {
    userId: string
}

export function DeleteForm(props: DeleteFormProps) {

    const { userId } = props

    // Boolean state handling opening the modal
    const [modalOpen, setModalOpen] = useState(false)

    // Hooks handling the router
    const router = useRouter()

    // Hooks handling showing the toast
    const toast = useToast()

    // Asynchronous function handling deleting the user
    const onDelete = async () => {
        await axios.delete(`/api/user/${userId}`)
        .then(() => {
            // Show the success toast
            toast({
                title: 'Success',
                description: 'Successfully deleted an account!',
                status: 'success',
                duration: 3000,
                isClosable: true
            })

            // Redirect the user to login page
            router.push('/login')
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
        <div className='flex flex-col items-center'>
            <Icon
                as={MdOutlineQuestionMark}            
                boxSize={50}
                color='red.600'
                bgColor='red.200'
                rounded='full'
            />
            <p className='mt-5 text-lg font-bold'>
                Careful! This action cannot be undone.
                Are you sure you want to delete this account?
            </p>
        </div>
    )

  return (
    <div>
        <Button
            variant='outline'
            colorScheme='red'
            onClick={() => setModalOpen(true)}
        >
            Delete my account
        </Button>
        <Popup
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            bodyContent={bodyContent}
            action={() => onDelete()}
            actionLabel='Yes, delete'
        />
    </div>
  )
}
