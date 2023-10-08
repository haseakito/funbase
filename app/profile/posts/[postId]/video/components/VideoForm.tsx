'use client'

import React, { Suspense, useState } from 'react'
import MuxPlayer from '@mux/mux-player-react'
import {
    useForm,
} from 'react-hook-form'
import {
    MdAddCircle,    
    MdVideoLibrary
} from 'react-icons/md'
import {    
    Button,    
    useToast,
    Spinner
} from '@chakra-ui/react'
import { MdEdit } from 'react-icons/md'
import { useRouter } from 'next/navigation'
import { FileUpload } from '@/components/FileUpload'
import { MuxData } from '@prisma/client'
import axios from 'axios'


type VideoFormProps = {
    postId: string,
    videoUrl?: string,
    muxData: MuxData | null
}

export function VideoForm(props: VideoFormProps) {

    const { postId, videoUrl, muxData } = props

    // Boolean state handling if the form is in editing or not
    const [editing, setEditing] = useState(false)

    // Hooks handling the router
    const router = useRouter()

    // Hooks handling showing the toast
    const toast = useToast()

    useForm<VideoFormProps>({
        mode: 'all',
        defaultValues: {
            postId: postId,
            videoUrl: videoUrl
        }
    })
    

    const onSubmit = async (videoUrl: string) => {
        
        await axios.post(`/api/post/${postId}/video`, {
            videoUrl: videoUrl
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
                <h2>Post video</h2>
                <Button
                    onClick={() => setEditing(!editing)}
                    variant='ghost'
                >                        
                    { editing && (
                        <>Cancel</>                        
                    )}
                    { !editing && !videoUrl&& (
                        <div className='flex gap-x-1'>
                            <MdAddCircle className='h-4 w-4 mr-2' />
                            Add an video
                        </div>
                    )}
                    { !editing && videoUrl && (
                        <div className='flex gap-x-1'>
                            <MdEdit className='h-4 w-4 mr-2' />
                            Edit video
                        </div>
                    )}                   
                </Button>
            </div>
            {
                !editing ? (
                    !videoUrl ? (
                        <div className='mt-2 flex items-center justify-center h-60 bg-slate-200 rounded-md'>
                            <MdVideoLibrary size={50} className='text-blue-500' />
                        </div>
                    )
                    :
                    (
                        <div className='relative aspect-video mt-2'>
                            <Suspense                    
                                fallback={<Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />}
                            >
                                <MuxPlayer
                                    playbackId={muxData?.playbackId || ''}
                                />
                            </Suspense>
                        </div>
                    )
                )
                :
                (
                    <div>
                        <FileUpload
                            endpoint='postVideo'
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
            {
                videoUrl && !editing && (
                    <div className='text-sm mt-2'>
                        Video can take a few minutes to laod.
                        Kindly refresh the page if the vide does not appear
                    </div>
                )
            }
        </div>
    )
}