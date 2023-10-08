'use client'

import { ourFileRouter } from "@/app/api/uploadthing/core"
import { UploadDropzone } from "@/libs/uploadthing"
import { useToast } from "@chakra-ui/react"

type FileUploadProps = {
    onChange: (url?: string) => void,
    endpoint: keyof typeof ourFileRouter
}

export const FileUpload = ({
    onChange,
    endpoint
}: FileUploadProps) => {

    // Hooks handling showing the toast
    const toast = useToast()

    return (
        <UploadDropzone                        
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url)
            }}
            onUploadError={({ message }) => {
                // Show the failure toast                    
                toast({
                    title: 'Ooops something went wrong!',
                    description: message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true
                })
            }}
        >            
        </UploadDropzone>
    )
}