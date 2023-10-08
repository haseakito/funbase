'use client'

import React, { useState } from 'react'
import {
  Button,
  useToast
} from '@chakra-ui/react'
import { formatPrice } from '@/libs/format'
import axios from 'axios'


type PurchaseButtonProps = {
  postId: string,
  price: number
}

export function PurchaseButton(props: PurchaseButtonProps) {

  const { postId, price } = props

  // Boolean state handling the loading for api call
  const [loading, setLoading] = useState(false)

  // Hooks handling showing the toast
  const toast = useToast()

  // Function handling checkout the post 
  const onClick = async () => {
    // Start API call
    setLoading(true)

    // Send post request to the server
    await axios.post(`/api/post/${postId}/checkout`)
    .then((res) => {
      
      // Redirect the user to the url in the server response
      window.location.assign(res.data.url)
      
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
    .finally(() => {
      setLoading(false)
    })
  }

  return (
    <Button
      variant='outline'
      onClick={onClick}
      isDisabled={loading}
      isLoading={loading}
      size='lg'
      className='w-full md:w-auto'
    >
      Buy for {formatPrice(price)}
    </Button>
  )
}
