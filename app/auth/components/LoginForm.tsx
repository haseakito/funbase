'use client'

import React, {
    useState,
    useEffect
} from 'react'
import { useSession, signIn  } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { LoginFormProps } from '@/utils/types/User'
import {
    useForm,
    Controller,
    SubmitHandler
} from 'react-hook-form'
import {
    MdKey,
    MdEmail,
    MdError,
    MdCheckCircle
} from 'react-icons/md'
import {    
    FaGoogle,
} from 'react-icons/fa'
import {
    Text,
    Button,
    Stack,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Input,
    Tooltip,
    useToast,    
    Box,
    Divider,    
} from '@chakra-ui/react'
import Link from 'next/link'


export function LoginForm() {

    // Boolean state handling revealing the password
    const [show, setShow] = useState(false)

    // Hooks handling the user session
    const { data: session, status } = useSession()

    // Hooks handling the router
    const router = useRouter()

    // Hooks handling showing the toast
    const toast = useToast()

    // Side Effects handling checking the user session
    useEffect(() => {
        if (status === "authenticated") {
            router.push(`/profile/`)
        }
    }, [status, router])


    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting }
    } = useForm<LoginFormProps>({
        mode: 'all'
    })

    // Function handling submitting user input
    const onSubmit: SubmitHandler<LoginFormProps> = async (e) => {        
                
        // POST request to log in
        const res = await signIn('credentials', {
            email: e.email,
            password: e.password,
            redirect: false   
        })

        if (res?.error) {
            // Show the failure toast                    
            toast({
                title: 'Ooops something went wrong!',
                description: res.error,
                status: 'error',
                duration: 3000,
                isClosable: true
            })
        } else {
            // Show the success toast
            toast({
                title: 'Enjoy!',
                description: 'Successfully logged in!',
                status: 'success',
                duration: 3000,
                isClosable: true
            })
            
            // Redirect the user to their own profile
            router.push('/profile')
        }
                  
    }

    // Function handling signing in with Google Auth Provider
    const logInWithGoogle = async () => {
        await signIn('google')
        .then(() => {
            // Show the success toast
            toast({
                title: 'Success',
                description: 'Successfully created an account!',
                status: 'success',
                duration: 3000,
                isClosable: true
            })

            // Redirect the user to their own profile
            router.push('/profile')  
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
        <div>            
            <form
                className='mt-10'
                onSubmit={handleSubmit(onSubmit)}
            >
                <Stack>
                    {/* Email */}
                    <Controller
                        name="email"
                        defaultValue=""
                        control={control}
                        rules={{
                            required: 'Please enter an email address.',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Please enter a valid email address.',
                            },
                        }}
                        render={({ field }) => (
                            <InputGroup>
                                <InputLeftElement className='pt-2'>
                                    <Tooltip label='Email' fontSize='md'>
                                        <span><MdEmail size={30} /></span>
                                    </Tooltip>
                                </InputLeftElement>
                                <Input
                                    {...field}
                                    {...register('email')}
                                    variant='filled'
                                    type="email"
                                    placeholder="Enter your email"
                                    size='lg'
                                    borderColor={errors.email ? 'red.500' : 'gray.200'}
                                    _hover={{ borderColor: 'gray.300' }}
                                />
                            </InputGroup>
                        )}
                    />
                    {/* Email validation prompt */}
                    <div className='flex'>
                        {errors.email ?
                            <MdError
                                color='red'
                                size={20}
                                className='pt-1'
                            />
                            :
                            <MdCheckCircle
                                color='green'
                                size={20}
                                className='pt-1'
                            />
                        }
                        <Text
                            color={errors.email ? 'red.500' : 'green.500'}
                        >
                            {errors.email ? errors.email.message : 'Please enter a valid email address'}
                        </Text>
                    </div>
                    {/* Password */}
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Please enter your password',

                            validate: {
                                lowercase: (value) => /[a-z]/.test(value) || 'At least one lowercase character',
                                uppercase: (value) => /[A-Z]/.test(value) || 'At least one uppercase letter',
                                number: (value) => /\d/.test(value) || 'At least one number',
                                special: (value) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(value) || 'At least one special character',
                            }
                        }}
                        render={({ field }) => (
                            <InputGroup>
                                <InputLeftElement
                                    className='pt-2'
                                >
                                    <Tooltip label='Password' fontSize='md'>
                                        <span><MdKey size={30} /></span>
                                    </Tooltip>
                                </InputLeftElement>
                                <Input
                                    {...field}
                                    {...register('password')}
                                    variant='filled'
                                    type={show ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    size='lg'
                                    borderColor={errors.password ? 'red.500' : 'gray.200'}
                                    _hover={{ borderColor: 'gray.300' }}
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
                    <Button
                        type='submit'
                        variant='outline'
                        colorScheme='blue'
                        size='md'
                        className='hover:rounded-none duration-300'
                        isLoading={isSubmitting}
                        mt={7}
                    >
                        Log In
                    </Button>
                    <div className='text-center mt-10'>
                        Don't have an account? <Link href='/auth/signup' className='text-blue-500 hover:underline'>Sign up</Link>
                    </div>
                </Stack>
            </form>
            <Box position='relative' padding='10'>                
                <Divider />
            </Box>            
            <Button
                colorScheme='gray'
                variant='outline'
                leftIcon={<FaGoogle />}
                w='full'
                onClick={() => logInWithGoogle()}
            >
                Sign in with Google
            </Button>                                            
        </div>
    )
}
