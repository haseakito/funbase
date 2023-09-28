'use client'

import React, { ReactNode } from 'react'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'

export function Provider({
    children
}: {
    children: ReactNode
}) {
  return (
    <CacheProvider>
        <ChakraProvider>
            { children }
        </ChakraProvider>
    </CacheProvider>
  )
}
