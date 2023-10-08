'use client'

import React from 'react'
import { 
    Button
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

type ProceedButtonProps = {
    postId: string,
    href: string,
    disabled: boolean
}

export function ProceedButton(props: ProceedButtonProps) {

    const { postId, href, disabled } = props
 
    // Hooks handling the router
    const router = useRouter()

  return (
    <Button
        px={20}
        variant='outline'
        colorScheme='cyan'
        isDisabled={disabled}
        onClick={() => router.push(`/profile/posts/${postId}/${href}`)}
    >
        Proceed to next step
    </Button>
  )
}
