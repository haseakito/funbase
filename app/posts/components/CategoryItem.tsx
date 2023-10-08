'use client'

import React from 'react'
import { IconType } from 'react-icons'
import qs from 'query-string'
import {
  Button,
  Icon
} from '@chakra-ui/react'
import {
  usePathname,
  useRouter,
  useSearchParams
} from 'next/navigation'

type CategoryItemProps = {
    id: string,
    name: string,
    icon?: IconType
}

export function CategoryItem(props: CategoryItemProps) {

    const { id, name, icon } = props

    const path = usePathname()

    const router = useRouter()

    const searchParams = useSearchParams()

    const currentCategoryId = searchParams.get('categoryId')
    const currentTitle = searchParams.get('title')

    const isSelected = currentCategoryId === id


    const onClick = async () => {
      const url =  qs.stringifyUrl({
        url: path,
        query: {
          title: currentTitle,
          categoryId: isSelected? null : id
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
        rounded-full flex items-center py-2 px-3 text-sm border border-slate-200 gap-x-1 hover:border-sky-700 transition`
      }
    >
        <Icon as={icon} size={50} />
        {name}
    </Button>
  )
}
