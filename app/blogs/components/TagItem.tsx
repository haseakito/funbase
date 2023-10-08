'use client'

import React from 'react'
import qs from 'query-string'
import {
    usePathname,
    useRouter,
    useSearchParams
} from 'next/navigation'
import { Button } from '@chakra-ui/react'
import Image from 'next/image'

type TagItemProps = {
    tagId: string,
    name: string,
    image: string
}

export function TagItem(props: TagItemProps) {

    const { tagId, name, image } = props

    // Hooks handling getting the current url path name
    const path = usePathname()

    // Hooks handling the router
    const router = useRouter()

    // Hooks handling getting the current url's query string
    const searchParams = useSearchParams()

    // CategoryId query
    const currentCategoryId = searchParams.get('categoryId')

    // Boolean state handling if the categoryId query is the same as tags provided
    const isSelected = currentCategoryId === tagId

    // Fuction handling
    const onClick = async () => {
        const url =  qs.stringifyUrl({
          url: path,
          query: {            
            tagId: isSelected? null : tagId
          }}, {skipNull: true, skipEmptyString: true}
        )
  
        router.push(url)
      }

  return (
    <Button
      type='button'
      onClick={onClick}
      className={
        `${
          isSelected && 'border-sky-700 text-sky-800 bg-sky-200/50'
        } 
        rounded-full flex items-center py-3 px-4 text-sm border border-slate-200 gap-x-1 hover:border-sky-700 transition`
      }
    >
        <Image
            src={image}
            unoptimized
            width={8}
            height={8}
            alt=''
            className=''
        />
        {name}
    </Button>
  )
}
