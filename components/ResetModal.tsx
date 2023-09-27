'use client'

import React, { useState } from 'react'
import {
    useForm,
    SubmitHandler,
    Controller
} from 'react-hook-form'
import {
    MdKey,
    MdEmail,
    MdError,
    MdCheckCircle
} from 'react-icons/md'
import {
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Input,
    Tooltip,
    Button,
    Text,
} from '@chakra-ui/react'
import { ResetPasswordProps } from '@/utils/types/User'
import { ModalProps } from '@/utils/types/Modal'

export function ResetModal(props: ModalProps) {

    const { title, isOpen, onClose } = props

    // Boolean state handling revealing the password
    const [show, setShow] = useState(false)

    // Hooks handling showing the toast
    const toast = useToast()

    const {
        register,
        handleSubmit,
        control,
        getValues,
        formState: { errors, isSubmitting, isSubmitSuccessful }
    } = useForm<ResetPasswordProps>({
        'mode': 'onChange'
    })

    // Function handling submitting the user input
    const onSubmit: SubmitHandler<ResetPasswordProps> = async (e) => {
        fetch('', {

        }).then(() => {

            // Show the success toast
            toast({
                title: 'Ready to go!',
                description: 'Successfully reset password!',
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
        <Modal isOpen={isOpen} onClose={onClose} isCentered size='4xl'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{ title }</ModalHeader>
                <ModalCloseButton />
                <form
                    className='py-6'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <ModalBody>
                        {/* Email */}
                        <FormControl>
                            <Controller
                                name='email'
                                defaultValue=''
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
                                        <InputLeftElement>
                                            <Tooltip label='Email' size='md'>
                                                <span><MdEmail size={30} /></span>
                                            </Tooltip>
                                        </InputLeftElement>
                                        <Input
                                            {...field}
                                            {...register('email')}
                                            variant='filled'
                                            type='email'
                                            placeholder='Enter your email'
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
                        </FormControl>

                        {/* New password */}
                        <FormControl>
                            <Controller
                                name='newPassword'
                                defaultValue=''
                                control={control}
                                rules={{
                                    required: 'Please enter a valid password',
                                    validate: {
                                        lowercase: (value) => /[a-z]/.test(value) || 'At least one lowercase character',
                                        uppercase: (value) => /[A-Z]/.test(value) || 'At least one uppercase letter',
                                        number: (value) => /\d/.test(value) || 'At least one number',
                                        special: (value) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(value) || 'At least one special character',
                                    }
                                }}
                                render={({ field }) => (
                                    <InputGroup>
                                        <InputLeftElement>
                                            <Tooltip label='Password' size='md'>
                                                <span><MdKey size={30} /></span>
                                            </Tooltip>
                                        </InputLeftElement>
                                        <Input
                                            {...field}
                                            {...register('newPassword')}
                                            variant='filled'
                                            type={show ? 'text' : 'password'}
                                            placeholder="Enter your password"
                                            size='lg'
                                            borderColor={errors.newPassword ? 'red.500' : 'gray.200'}
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
                                {errors.newPassword ?
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
                                    color={errors.newPassword ? 'red.500' : 'green.500'}
                                >
                                    {errors.newPassword ? errors.newPassword.message : 'Please enter a valid password'}
                                </Text>
                            </div>
                        </FormControl>

                        <FormControl>
                            {/* Confirm Password */}
                            <Controller
                                name="confirmPassword"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Please confirm your password',
                                    validate: (value) => value === getValues('newPassword') || 'Please confirm your password'
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
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            type='submit'
                            variant='outline'
                            colorScheme={isSubmitSuccessful ? 'green' : 'blue'}
                            size='md'
                            className='w-full hover:rounded-none duration-300'
                            isLoading={isSubmitting}
                        >
                            {isSubmitSuccessful ? <MdCheckCircle size={30} /> : 'Reset Password'}
                        </Button>
                        <Button
                            variant='ghost'
                            size='md'
                            className='w-full'
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}
