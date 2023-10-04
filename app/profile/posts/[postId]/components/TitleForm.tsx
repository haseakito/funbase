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
} from '@chakra-ui/react'
import axios from 'axios'
import { MdEdit } from 'react-icons/md'
import { useRouter } from 'next/navigation'

type TitleFormProps = {
    postId: string,
    title: string
}

export function TitleForm(props: TitleFormProps) {

    const { postId, title } = props

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
    } = useForm<TitleFormProps>({
        mode: 'all',
        defaultValues: {            
            title: title
        }
    })

    const onSubmit: SubmitHandler<TitleFormProps> = async (e) => {
        
        await axios.patch(`/api/post/${postId}`, {
            title: e.title
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
                <h2 className='font-semibold'>Post title</h2>
                <Button
                    onClick={() => setEditing(!editing)}
                    variant='ghost'
                >
                    { editing ?
                        <>Cancel</>
                        :        
                        <span className='flex gap-x-1'>
                            <MdEdit className='h-5 w-5' />
                            Edit title
                        </span>
                    }
                </Button>
            </div>
            {
                !editing && (
                    <p className='text-sm italic text-slate-600'>
                        { title }
                    </p>
                )
            }
            {
                editing ?
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='mt-3'
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
