'use client'

import React from 'react'
import qs from 'query-string'
import {
    usePathname,
    useRouter,
    useSearchParams
} from 'next/navigation'
import { Button } from '@chakra-ui/react'

type TagItemProps = {
    tagId: string,
    name: string,
    image: string
}

export function TagItem(props: TagItemProps) {

    const { tagId, name, image } = props

    const path = usePathname()

    const router = useRouter()

    const searchParams = useSearchParams()

    const currentCategoryId = searchParams.get('categoryId')

    const isSelected = currentCategoryId === tagId

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
        <img
            src={image}
            alt=''
            className='w-8 h-8'
        />
        {name}
    </Button>
  )
}
