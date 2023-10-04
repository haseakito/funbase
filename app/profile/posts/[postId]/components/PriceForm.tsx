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
import { formatPrice } from '@/libs/format'

type PriceFormProps = {
    postId: string,
    price: number
}

export function PriceForm(props: PriceFormProps) {

    const { postId, price } = props

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
    } = useForm<PriceFormProps>({
        mode: 'all',
        defaultValues: {
            postId: postId,
            price: price
        }
    })

    const onSubmit: SubmitHandler<PriceFormProps> = async (e) => {
        await axios.patch(`/api/post/${postId}`, {
            price: e.price
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
                <h2>Post price</h2>
                    <Button
                        onClick={() => setEditing(!editing)}
                        variant='ghost'
                    >
                        { editing ?
                            <>Cancel</>
                            :        
                            <span className='flex gap-x-1'>
                                <MdEdit className='h-5 w-5 mr-2' />
                                Edit price
                            </span>
                        }
                    </Button>
            </div>
            {
                !editing && (
                    <p className='text-sm italic text-slate-600'>
                        {
                            price ?
                                formatPrice(price)
                            :
                                'No price'
                        }
                    </p>
                )
            }
            {
                editing ?
                <form
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Controller
                        name='price'
                        control={control}
                        render={({ field }) => (
                            <InputGroup>
                                <Input
                                    {...field}
                                    {...register('price')}
                                    disabled={isSubmitting}
                                    placeholder='Set price for your customer'
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
