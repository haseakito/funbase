'use client'

import React, {
    useState,
    useEffect
} from 'react'
import { useAuthContext } from './AuthController'
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
import { FaExternalLinkAlt } from 'react-icons/fa'
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
    useDisclosure
} from '@chakra-ui/react'
import Link from 'next/link'
import { ResetModal } from './ResetModal'


export function LoginForm() {

    // Boolean state handling revealing the password
    const [show, setShow] = useState(false)

    //
    const { isOpen, onOpen, onClose } = useDisclosure()

    // Hooks handling user auth
    const useAuth = useAuthContext()

    // Hooks handling the router
    const router = useRouter()

    // Hooks handling showing the toast
    const toast = useToast()

    // Side effects handling checking if the user is already logged in
    useEffect(() => {
        if (useAuth.token) {
            router.push(`/users/${useAuth.token}`)
        }
    }, [])

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

        // Call the login API
        fetch('', {

        }).then(() => {

            // Show the success toast
            toast({
                title: 'Enjoy!',
                description: 'Successfully logged in!',
                status: 'success',
                duration: 3000,
                isClosable: true
            })

        }).catch(() => {

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
            <ResetModal
                title='Reset Password'
                isOpen={isOpen}
                onClose={onClose}
            />
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
                    {/* Password validation prompt */}
                    <div className='flex'>
                        {errors.password ?
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
                            color={errors.password ? 'red.500' : 'green.500'}
                        >
                            {errors.password ? errors.password.message : 'Please enter a valid password'}
                        </Text>
                    </div>
                    <div
                        className='flex mt-6 text-blue-300 px-4 space-x-2'
                    >
                        <button
                            className='hover:underline'
                            onClick={onOpen}
                        >
                            Forgot Password
                        </button>
                        <FaExternalLinkAlt
                            className='mt-1'
                        />
                    </div>
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
                        Don't have an account? <Link href='/signup' className='text-blue-500 hover:underline'>Sign up</Link>
                    </div>
                </Stack>
            </form>
        </div>
    )
}