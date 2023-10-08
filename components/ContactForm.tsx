'use client'

import React from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { ContactFormProps } from '@/utils/types/User'
import {
    MdEmail,
    MdOutlineContactSupport,
    MdError,
    MdCheckCircle,
} from 'react-icons/md'
import {
    Text,
    Button,
    Stack,
    InputGroup,
    InputLeftElement,
    Input,
    Textarea,
    Tooltip,
    useToast,
    FormLabel
} from '@chakra-ui/react'

export function ContactForm() {

    // Hooks handling showing the toast
    const toast = useToast()

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting, isSubmitSuccessful }
    } = useForm<ContactFormProps>({
        'mode': 'onSubmit'
    })

    // Function handling submitting the user input
    const onSubmit: SubmitHandler<ContactFormProps> = async () => {
        fetch('', {

        }).then(() => {

            // Show the success toast
            toast({
                title: 'Thank you',
                description: 'Successfully sent message!',
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
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
            <h2 id='contact' className="group mb-4 text-4xl tracking-tight font-extrabold text-center">
                <span>Contact Us</span>
                <a href='#contact' className='ml-2 text-blue-700 opacity-0 transition-opacity dark:text-blue-500 group-hover:opacity-100'>#</a>
            </h2>
            <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Talk to us.</p>            
            <form
                className="space-y-8"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Stack >
                    {/* Email */}
                    <FormLabel>Email*</FormLabel>
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
                    {/* Contact subject */}
                    <FormLabel>Subject*</FormLabel>
                    <Controller
                        name='subject'
                        defaultValue=""
                        control={control}
                        rules={{
                            required: 'Please enter contact subject.'
                        }}
                        render={({ field }) => (
                            <InputGroup>
                                <InputLeftElement>
                                    <Tooltip label='Subject' fontSize='md'>
                                        <span><MdOutlineContactSupport size={30} /></span>
                                    </Tooltip>
                                </InputLeftElement>
                                <Input
                                    {...field}
                                    {...register('subject')}
                                    variant='filled'
                                    type='text'
                                    placeholder='Let us know how we can help you'
                                    borderColor={errors.subject ? 'red.500' : 'gray.200'}
                                    _hover={{ borderColor: 'gray.300' }}
                                />
                            </InputGroup>
                        )}
                    />
                    {/* Contact subject validation */}
                    <div className='flex'>
                        {
                            errors.subject ?
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
                            color={errors.subject ? 'red.500' : 'green.500'}
                        >
                            {errors.subject ? errors.subject.message : 'Please enter a valid email address'}
                        </Text>
                    </div>
                    {/* Contact detail */}
                    <FormLabel>Details*</FormLabel>
                    <Controller
                        name='details'
                        defaultValue=''
                        control={control}
                        rules={{
                            required: 'Please enter contact details',
                            minLength: {
                                value: 5,
                                message: 'Contact details should be more than 5 words!'
                            }
                        }}
                        render={({ field }) => (
                            <Textarea
                                {...field}
                                {...register('details')}
                                placeholder='Leave comment so we can help you!'
                                rows={7}
                                size='lg'
                            />
                        )}
                    />
                    {/* Contact detail validation */}
                    <div className='flex'>
                        {
                            errors.details ?
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
                            color={errors.details ? 'red.500' : 'green.500'}
                        >
                            {errors.details ? errors.details.message : 'Please enter a valid email address'}
                        </Text>
                    </div>
                </Stack>
                <Button
                    type='submit'
                    variant='outline'
                    colorScheme={isSubmitSuccessful ? 'green' : 'blue'}
                    size='md'
                    className='w-full hover:rounded-none duration-300'
                    isLoading={isSubmitting}
                    mt={7}
                >
                    {isSubmitSuccessful ? <MdCheckCircle size={30} /> : 'Send Message'}
                </Button>
            </form>
        </div>
    )
}
