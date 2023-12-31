'use client'

import React, { useState } from 'react'
import z from 'zod'
import {
    useForm,
    Controller,    
} from 'react-hook-form'
import {    
    Button,
    InputGroup,
    useToast,    
    Textarea
} from '@chakra-ui/react'
import axios from 'axios'
import { MdEdit } from 'react-icons/md'
import { useRouter } from 'next/navigation'

type DescriptionFormProps = {
    postId: string,
    description: string
}

const formSchema = z.object({
    description: z.string().min(1, {
        message: 'Description should not be empty'
    })  
})

export function DescriptionForm(props: DescriptionFormProps) {

    const { postId, description } = props

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
    } = useForm<z.infer<typeof formSchema>>({
        mode: 'all',
        defaultValues: {            
            description: description
        }
    })

    const onSubmit = async (e: z.infer<typeof formSchema>) => {
        await axios.patch(`/api/post/${postId}`, {
            description: e.description
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
                <h2>Post description</h2>
                <Button
                    onClick={() => setEditing(!editing)}
                    variant='ghost'
                >
                    { editing ?
                        <>Cancel</>
                        :        
                        <span className='flex gap-x-1'>
                            <MdEdit className='h-5 w-5 mr-2' />
                            Edit description
                        </span>
                    }
                </Button>
            </div>
            {
                !editing ?
                <p className='text-sm italic text-slate-600'>
                    {description || 'No description'}
                </p>
                :
                null
            }
            {
                editing ?
                <form
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Controller
                        name='description'
                        control={control}
                        render={({ field }) => (
                            <InputGroup>
                                <Textarea
                                    {...field}
                                    {...register('description')}
                                    disabled={isSubmitting}
                                    placeholder='e.g. My first Post'
                                    rows={10}
                                    cols={10}
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
