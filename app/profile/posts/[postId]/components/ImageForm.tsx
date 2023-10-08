'use client'

import React, { Suspense, useState } from 'react'
import {
    MdAddCircle,
    MdImage
} from 'react-icons/md'
import {    
    Button,    
    useToast,
    Spinner
} from '@chakra-ui/react'
import axios from 'axios'
import { MdEdit } from 'react-icons/md'
import { useRouter } from 'next/navigation'
import { FileUpload } from '@/components/FileUpload'


type ImageFormProps = {
    postId: string,
    imageUrl?: string
}

export function ImageForm(props: ImageFormProps) {

    const { postId, imageUrl } = props

    // Boolean state handling if the form is in editing or not
    const [editing, setEditing] = useState(false)

    // Hooks handling the router
    const router = useRouter()

    // Hooks handling showing the toast
    const toast = useToast()


    const onSubmit = async (imageUrl: string) => {

        await axios.patch(`/api/post/${postId}`, {
            imageUrl: imageUrl
        })
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

            router.refresh()            
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
        <div className='mt-6 border bg-slate-100 rounded-md p-4'>
            <div className='font-medium flex items-center justify-between'>           
                <h2>Post image</h2>
                <Button
                    onClick={() => setEditing(!editing)}
                    variant='ghost'
                >                        
                    { editing && (
                        <>Cancel</>                        
                    )}
                    { !editing && !imageUrl && (
                        <div className='flex gap-x-1'>
                            <MdAddCircle className='h-4 w-4 mr-2' />
                            Add an Image
                        </div>
                    )}
                    { !editing && imageUrl && (
                        <div className='flex gap-x-1'>
                            <MdEdit className='h-4 w-4 mr-2' />
                            Edit image
                        </div>
                    )}                   
                </Button>
            </div>
            {
                !editing ? (
                    !imageUrl ? (
                        <div className='mt-2 flex items-center justify-center h-60 bg-slate-200 rounded-md'>
                            <MdImage size={50} className='text-blue-500' />
                        </div>
                    )
                    :
                    (
                        <div className='relative aspect-video mt-2'>
                            <Suspense
                                fallback={<Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />}
                            >
                                <img
                                    src={imageUrl}
                                    alt=''                                                                        
                                    className='object-cover rounded-md'
                                />
                            </Suspense>
                        </div>
                    )
                )
                :
                (
                    <div>
                        <FileUpload
                            endpoint='postImage'
                            onChange={(url) => {
                                if (url) {
                                    onSubmit(url)
                                }
                            }}
                        />
                        <div className='text-xs mt-4'>
                            16:9 aspect ratio recommended
                        </div>
                    </div>
                )
            }            
        </div>
    )
}
