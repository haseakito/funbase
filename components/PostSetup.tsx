'use client'

import React, { useState } from 'react'
import {
    useForm,
    Controller,
    SubmitHandler
} from 'react-hook-form'
import {    
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Stack,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Input,
    Tooltip,
    useToast,
    useDisclosure,
    Box,
    Divider,
    AbsoluteCenter,
    Textarea
} from '@chakra-ui/react'
import axios from 'axios'
import { MdEdit } from 'react-icons/md'
import { useRouter } from 'next/navigation'

type PostSetupProps = {
    title: string,
    description?: string,
    imageUrl?: string,
    price: number,
}

export function PostSetup() {    

    // Boolean state handling if the form is in editing or not
    const [editing, setEditing] = useState(false)

    // Hooks handling the router
    const router = useRouter()

    // Hooks handling showing the toast
    const toast = useToast()

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting, isValid }
    } = useForm<PostSetupProps>({
        mode: 'all',
        
    })

    // Function handling 
    const onSubmit: SubmitHandler<PostSetupProps> = async (e) => {
        
        await axios.post('/api/post', e)
        .then((res) => {                    
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

            // Redirect the user to their own profile
            router.push(`/profile/post/${res.data.id}`)
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

        // Refresh the page
        router.refresh()
    }

    return (
        <div className='mt-6 border bg-slate-100 rounded-md p-4'>
            <div className='font-medium flex items-center justify-between'>
                <h2>Post title</h2>
                <Button
                    onClick={() => setEditing(!editing)}
                    variant='ghost'
                >
                    { editing ?
                        <>Cancel</>
                        :        
                        <span>
                            <MdEdit className='h-4 w-4 mr-2' />
                            Edit title
                        </span>
                    }
                </Button>
            </div>
            {
                editing ?
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='mt-4 space-y-4'
                >
                    <Controller
                        name='title'
                        control={control}
                        render={({ field }) => (
                            <InputGroup>
                                <Input
                                    {...field}
                                    {...register('title')}
                                    disabled={isSubmitting}
                                    placeholder='e.g. My first Post'
                                    size='lg'
                                />
                            </InputGroup>
                        )}
                    />                
                    <Button
                        type='submit'
                        variant='outline'
                        colorScheme='green'
                        size='md'
                        className='hover:rounded-none duration-300'
                        disabled={!isValid}
                        isLoading={isSubmitting}
                        mt={7}
                    >
                        Submit
                    </Button>
                </form>
                :
                null
            }
        </div>
  )
}
