'use client'

import React from 'react'
import z from 'zod'
import {
    Button,
    Stack,
    InputGroup,    
    Input,
    Textarea,
    FormLabel,
    FormErrorMessage,
    useToast
} from '@chakra-ui/react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import axios from 'axios'

type ProfileFormProps = {
    userId: string,
    name: string,
    bio: string,
    email: string,
}

const formSchema = z.object({
    name: z.string().min(1, {
        message: 'User name should not be blank'
    }),
    bio: z.string().min(1, {
        message: 'Profile bio should not be blank'
    }),
    email: z.string()
    .email({
        message: 'This is not email format'
    })
    .nonempty({
        message: 'Email should not be blank'
    }),
})

export function ProfileForm(props: ProfileFormProps) {

    const { userId, name, bio, email } = props

    // Hooks handling the router
    const router = useRouter()

    // Hooks handling showing the toast
    const toast = useToast()

    const {        
        handleSubmit,
        register,
        control,
        formState: { errors, isSubmitting }
    } = useForm<z.infer<typeof formSchema>>({        
        mode: 'all',
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: name,
            bio: bio,
            email: email
        }
    })

    // Asynchronous function handling updating the user profile
    const onSubmit = async (e: z.infer<typeof formSchema>) => {
        
        await axios.patch(`/api/user/${userId}`, {
            name: e.name,
            bio: e.bio,
            email: e.email
        })
        .then(() => {            
            // Show the success toast
            toast({
                title: 'Success',
                description: 'Successfully updated an account!',
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

  return (
    <div className=''>
        <form
            onSubmit={handleSubmit(onSubmit)}
        >
            <Stack spacing={3}>
                <FormLabel fontWeight='semibold'>
                    Name
                </FormLabel>
                <Controller
                    name='name'
                    control={control}
                    render={({ field }) => (
                        <InputGroup>
                            <Input
                                {...field}
                                {...register('name')}
                                size='lg'
                                fontWeight='medium'
                            />
                        </InputGroup>     
                    )}
                />
                <FormErrorMessage>
                    { errors.name && errors.name.message }
                </FormErrorMessage>
                <FormLabel>
                    Bio
                </FormLabel>
                <Controller
                    name='bio'
                    control={control}
                    render={({ field }) => (
                        <InputGroup>
                            <Textarea
                                {...field}
                                {...register('bio')}
                                size='lg'
                                fontWeight='medium'
                            />
                        </InputGroup>
                    )}
                />
                <FormLabel fontWeight='semibold'>
                    Email
                </FormLabel>
                <Controller
                    name='email'
                    control={control}
                    render={({ field }) => (
                        <InputGroup>
                            <Input
                                {...field}
                                {...register('email')}
                                size='lg'
                                fontWeight='medium'
                            />
                        </InputGroup>     
                    )}
                />
                <FormErrorMessage>
                    { errors.email && errors.email.message }
                </FormErrorMessage>
                <Button
                    type='submit'
                    variant='outline'
                    colorScheme='purple'
                    mt={10}
                    isLoading={isSubmitting}                    
                >
                    Save
                </Button>
            </Stack>
        </form>
    </div>
  )
}
