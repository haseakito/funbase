'use client'

import React, {
    useState
} from 'react'
import {
    useForm,
    SubmitHandler,
} from 'react-hook-form'
import {
    MdCheckCircle
} from 'react-icons/md'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Progress,
    Input,
    Button
} from '@chakra-ui/react'
import axios from 'axios'
import { ModalProps } from '@/utils/types/Modal'

export function UploadModal(props: ModalProps) {

    const { title, isOpen, onClose } = props

    // Number state handling the file upload progress
    const [progress, setProgress] = useState(0)

    const {
        register,
        handleSubmit,
        formState: {  isSubmitting, isSubmitSuccessful }
    } = useForm({
        'mode': 'onChange'
    })

    // Function handling submitting the user select image
    //const onSubmit: SubmitHandler = async (data) => {

    //    console.log(data)
        

        // axios.post(
        //     "",
        //     data,
        //     {
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         onUploadProgress: (event) => {
        //             setProgress(Math.round((100 * event.loaded) / event.total))
        //         }                
        //     }
        // )
        // .then(() => {

        // })
        // .catch(() => {

        // })
    //}

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size='4xl'>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>{ title }</ModalHeader>
            <ModalCloseButton />
            <form                
            >
                <ModalBody>
                    <div className='flex items-center justify-center w-full'>
                        <div className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'>
                            <svg className='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>Click to upload</p>
                            <p className='text-xs text-gray-500 dark:text-gray-400'>SVG, PNG, JPG or GIF</p>
                            <Input
                                {...register('image')}
                                type='file'
                                hidden
                            />
                        </div>
                    </div>
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
                        {isSubmitSuccessful ? <MdCheckCircle size={30} /> : 'Upload'}
                    </Button>
                </ModalFooter>
            </form>
        </ModalContent>
    </Modal>
  )
}
