'use client'

import React, { useState } from 'react'
import {
    useForm,
    Controller,
    SubmitHandler
} from 'react-hook-form'
import {    
    Button,
    InputGroup,
    Input,
    Tooltip,
    useToast,
} from '@chakra-ui/react'
import axios from 'axios'
import { MdEdit } from 'react-icons/md'
import { useRouter } from 'next/navigation'
import { formatPrice } from '@/libs/format'
import { Popup } from '@/components/Popup'

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

    const bodyContent = (
        <div>
            <h2 className='mb-5 text-lg font-bold'>
                Edit the price to charge your fan
            </h2>
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
        </div>
    )

    const onPublishFree = async () => {
        await axios.patch(`/api/post/${postId}`, {
            published: true,
            price: 0
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

            router.push('profile/posts')
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

    const onSubmit: SubmitHandler<PriceFormProps> = async (e) => {
        await axios.patch(`/api/post/${postId}`, {
            published: true,
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

            router.replace('/profile/posts')
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
        <div className='py-8 px-4 lg:py-16 lg:px-6'>
            <div className="space-y-8 lg:grid lg:grid-cols-2 sm:gap-6 xl:gap-10 lg:space-y-0">
                {/* Pricing Card */}
                <div className="flex flex-col p-6 mx-auto max-w-xl text-center text-gray-900 rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                    <h3 className="mb-4 text-2xl font-semibold">Free tier</h3>
                    <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best option for sample video to introduce your work.</p>
                    <div className="flex justify-center items-baseline my-8">
                        <span className="mr-2 text-5xl font-extrabold">Free</span>
                        <span className="text-gray-500 dark:text-gray-400">/ one time</span>
                    </div>
                    {/* List */}
                    <ul className="mb-8 space-y-4 text-left">
                        <li className="flex items-center space-x-3">
                            {/* Icon */}
                            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            <span>Individual configuration</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            {/* Icon */}
                            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            <span>No setup, or hidden fees</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            {/* Icon */}
                            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            <span>Best suited for starter post</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            {/* Icon */}
                            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            <span>Premium support: <span className="font-semibold">6 months</span></span>
                        </li>
                        <li className="flex items-center space-x-3">
                            {/* Icon */}
                            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            <span>Free updates: <span className="font-semibold">6 months</span></span>
                        </li>
                    </ul>
                    <Button
                        onClick={onPublishFree}
                        variant='outline'
                        colorScheme='blue'
                        className="focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900"
                    >
                        Publish
                    </Button>
                </div>
                <div className="flex flex-col p-6 mx-auto max-w-xl text-center text-gray-900 rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                    <h3 className="mb-4 text-2xl font-semibold">Premium tier</h3>
                    <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best option for new funbase project for your funs</p>
                    <div className="flex justify-center items-baseline my-8">
                        <span className="mr-2 text-5xl font-extrabold">Custom</span>
                        <span className="text-gray-500 dark:text-gray-400">/ one time</span>
                    </div>
                    {/* List */}
                    <ul className="mb-8 space-y-4 text-left">
                        <li className="flex items-center space-x-3">
                            {/* Icon */}
                            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            <span>Individual configuration</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            {/* Icon */}
                            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            <span>No setup, or hidden fees</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            {/* Icon */}
                            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            <span>Team size: <span className="font-semibold">1 developer</span></span>
                        </li>
                        <li className="flex items-center space-x-3">
                            {/* Icon */}
                            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            <span>Premium support: <span className="font-semibold">6 months</span></span>
                        </li>
                        <li className="flex items-center space-x-3">
                            {/* Icon */}
                            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            <span>Free updates: <span className="font-semibold">6 months</span></span>
                        </li>
                    </ul>
                    <Button
                        variant='outline'
                        colorScheme='blue'
                        onClick={() => setEditing(true)}
                        className="focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900"
                    >
                        Edit Price
                    </Button>
                </div>
            </div>        
            <Popup
                isOpen={editing}
                onClose={() => setEditing(false)}
                bodyContent={bodyContent}
                action={handleSubmit(onSubmit)}
                actionLabel='Submit'
            />
        </div>
    )
}
