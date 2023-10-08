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
    useToast,    
} from '@chakra-ui/react'
import {
    Select
} from 'chakra-react-select'
import { useRouter } from 'next/navigation'
import { MdEdit } from 'react-icons/md'
import axios from 'axios'


type CategoryFormProps = {
    postId: string,
    categories: { value: string, label: string }[],
    options: { value: string, label: string }[],
}

export function CategoryForm(props: CategoryFormProps) {

    const { postId, categories, options} = props

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
    } = useForm<CategoryFormProps>({
        mode: 'all',
        defaultValues: {
            postId: postId,
            categories: categories,            
        }
    })

    const onSubmit: SubmitHandler<CategoryFormProps> = async (e) => {        
                
        e.categories.map(async (category)  => {
            await axios.patch(`/api/post/category`, {
                postId: e.postId,
                categoryId: category.value,                
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
        })

        // Show the success toast
        toast({
            title: 'Success',
            description: 'Successfully added new categories!',
            status: 'success',
            variant: 'top-accent',
            duration: 3000,
            isClosable: true,
            position: 'top'
        })
    }

  return (
    <div className='mt-6 border bg-slate-100 rounded-md p-4'>
            <div className='font-medium flex items-center justify-between'>           
                <h2 className='font-semibold'>Post category</h2>
                <Button
                    onClick={() => setEditing(!editing)}
                    variant='ghost'
                >
                    { editing ?
                        <>Cancel</>
                        :        
                        <span className='flex gap-x-1'>
                            <MdEdit className='h-5 w-5' />
                            Edit category
                        </span>
                    }                    
                </Button>
            </div>
            {
                !editing &&
                    categories ?
                    <div>
                        {categories.map((category) => (
                            <span
                                key={category.value}
                                className='bg-gray-200 rounded-md p-1 text-sm font-medium'
                            >
                                {category.label}
                            </span>
                        ))}
                    </div>    
                    :
                    <p className='text-sm italic text-slate-600'>
                        Select category
                    </p>            
            }            
            {
                editing ?
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='mt-3'
                >
                    <Controller
                        name='categories'
                        control={control}
                        render={({ field }) => (
                            <InputGroup>
                                <Select
                                    {...field}                                                                        
                                    isMulti                                    
                                    options={options}
                                    closeMenuOnSelect
                                    closeMenuOnScroll={false}                                                                       
                                    placeholder='Select one or more categories'
                                    className='w-full'
                                />
                            </InputGroup>
                        )}
                    />
                    <Button
                        type='submit'
                        variant='outline'
                        colorScheme='green'
                        size='md'
                        className='w-full'
                        isDisabled={!isValid}
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
