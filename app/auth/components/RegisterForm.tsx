'use client'

import React, {
    useState,
    useEffect
} from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from 'next-auth/react'
import { RegisterFormProps } from '@/utils/types/User'
import {
    useForm,
    Controller,
    SubmitHandler
} from 'react-hook-form'
import {
    MdAccountCircle,
    MdEmail,
    MdKey,
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
    UnorderedList,
    ListItem,
    Box,
    Divider,    
} from '@chakra-ui/react'
import Link from 'next/link'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'


export default function RegisterForm() {

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
        getValues,
        formState: { errors, isSubmitting }
    } = useForm<RegisterFormProps>({
        mode: 'all'
    })

    // Function handling submitting the user input
    const onSubmit: SubmitHandler<RegisterFormProps> = async (e) => {
        
        await axios.post('/api/user', e)
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

    // Function handling signing in with Google Auth Provider
    const signInWithGoogle = async () => {
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
                <Stack spacing={4} >
                    {/* User name */}
                    <InputGroup>
                        <InputLeftElement className='pt-2'>
                            <Tooltip label='Username' fontSize='md'>
                                <span><MdAccountCircle size={30} /></span>
                            </Tooltip>
                        </InputLeftElement>                    
                        <Input
                            variant='filled'
                            type='text'
                            placeholder='User name'
                            size='lg'
                            {...register('username')}
                        />                    
                    </InputGroup>
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
                    {/* Confirm Password */}
                    <Controller
                        name="confirmPassword"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Please confirm your password',
                            validate: (value) => value === getValues('password') || 'Please confirm your password'
                        }}
                        render={({ field }) => (
                            <InputGroup>
                                <Tooltip label='Confirm Password'>
                                    <Input
                                        {...field}
                                        {...register('confirmPassword')}
                                        variant='filled'
                                        type="password"
                                        size='lg'
                                        placeholder="Confirm your password"
                                    />
                                </Tooltip>
                            </InputGroup>
                        )}
                    />
                    {/* Confirm password validation prompt */}
                    <div className='flex'>
                        {errors.confirmPassword ?
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
                            color={errors.confirmPassword ? 'red.500' : 'green.500'}
                        >
                            {errors.confirmPassword ? errors.confirmPassword.message : 'Please confirm your password'}
                        </Text>
                    </div>
                    <Button
                        type='submit'
                        variant='outline'
                        colorScheme='blue'
                        size='md'
                        isLoading={isSubmitting}
                        mt={5}
                    >
                        Sign up
                    </Button>
                    <div className='text-center mt-2'>
                        Already have an account? <Link href='/auth/login' className='text-blue-500 hover:underline'>Log in</Link>
                    </div>
                </Stack>
            </form>
            <Box position='relative' padding='10'>
                <Divider />                
            </Box>
            <Button
                colorScheme='gray'
                variant='outline'
                w='full'
                leftIcon={<FaGoogle />}
                onClick={() => signInWithGoogle()}
            >
                Sign in with Google
            </Button>             
        </div>
    )
}
