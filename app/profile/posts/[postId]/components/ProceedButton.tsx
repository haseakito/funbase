'use client'

import React from 'react'
import { 
    Button
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

type ProceedButtonProps = {
    postId: string,
    disabled: boolean
}

export function ProceedButton(props: ProceedButtonProps) {

    const { postId, disabled } = props
 
    // Hooks handling the router
    const router = useRouter()

  return (
    <Button
        px={20}
        variant='outline'
        colorScheme='cyan'
        isDisabled={disabled}
        onClick={() => router.push(`/profile/posts/${postId}/video`)}
    >
        Proceed to next step
    </Button>
  )
}
