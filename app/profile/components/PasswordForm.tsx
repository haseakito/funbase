'use client'

import React, { useState } from 'react'
import z from 'zod'
import {
    Button,
    Stack,
    InputGroup,
    InputRightElement,
    Input,    
    FormLabel,
    FormErrorMessage,
    useToast,
    UnorderedList,
    ListItem
} from '@chakra-ui/react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import axios from 'axios'

type PasswordFormProps = {
    userId: string,    
}

const formSchema = z.object({
    newPassword: z.string(),
    confirmPassword: z.string()
})

export function PasswordForm(props: PasswordFormProps) {

    const { userId } = props

    const [show, setShow] = useState(false)

    // Hooks handling the router
    const router = useRouter()

    // Hooks handling showing the toast
    const toast = useToast()

    const {        
        handleSubmit,
        register,
        control,
        getValues,
        formState: { errors, isSubmitting, isValid }
    } = useForm<z.infer<typeof formSchema>>({        
        mode: 'all',
        resolver: zodResolver(formSchema),        
    })

    const onSubmit = async (e: z.infer<typeof formSchema>) => {        
        
        await axios.patch(`/api/user/${userId}`, {
            hashedPassword: e.confirmPassword
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

  return (
    <div className=''>
        <form
            onSubmit={handleSubmit(onSubmit)}
        >
            <Stack spacing={3}>
                <FormLabel>
                    New Password
                </FormLabel>
                <Controller
                    name='newPassword'
                    control={control}
                    rules={{
                        required: true,
                        validate: {
                            lowercase: (value) => /[a-z]/.test(value) || 'At least one lowercase character',
                            uppercase: (value) => /[A-Z]/.test(value) || 'At least one uppercase letter',
                            number: (value) => /\d/.test(value) || 'At least one number',
                            special: (value) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(value) || 'At least one special character',
                        }
                    }}
                    render={({ field }) => (
                        <InputGroup>
                            <Input
                                {...field}
                                {...register('newPassword')}
                                type={show ? 'text' : 'password'}
                                size='lg'
                                fontWeight='medium'
                            />
                            <InputRightElement
                                    className='pr-10'
                                >
                                <Button
                                    className='mt-2'
                                    size='md'
                                    onClick={() => setShow(!show)}
                                >
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>     
                    )}
                />                
                <FormErrorMessage>
                    { errors.newPassword && errors.newPassword.message }
                </FormErrorMessage>

                {/* Password validation prompt */}
                <UnorderedList fontSize="sm" color='gray.500' mt="2" ml="5">
                    <ListItem>
                        At least one lowercase letter
                    </ListItem>
                    <ListItem>
                        At least one uppecase letter
                    </ListItem>
                    <ListItem>
                        At least one number
                    </ListItem>
                    <ListItem>
                        At least one special character
                    </ListItem>
                </UnorderedList>

                <FormLabel fontWeight='semibold'>
                    Confirm Password
                </FormLabel>
                <Controller
                    name='confirmPassword'
                    control={control}
                    rules={{
                        required: 'Please confirm your password',
                        validate: (value) => value === getValues('newPassword') || 'Please confirm your password'
                    }}
                    render={({ field }) => (
                        <InputGroup>
                            <Input
                                {...field}
                                {...register('confirmPassword')}
                                type='password'
                                size='lg'
                                fontWeight='medium'
                            />
                        </InputGroup>
                    )}
                />
                <FormErrorMessage>
                    { errors.confirmPassword && errors.confirmPassword.message }
                </FormErrorMessage>
                <Button
                    type='submit'                    
                    variant='outline'
                    colorScheme='purple'
                    mt={10}
                    isDisabled={!isValid}
                    isLoading={isSubmitting}                    
                >
                    Save
                </Button>
            </Stack>
        </form>
    </div>
  )
}
