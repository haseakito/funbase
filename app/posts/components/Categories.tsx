'use client'

import React from 'react'
import {
    FcCamera,
    FcCloseUpMode,
    FcAreaChart,
    FcSportsMode,
    FcBusiness,
    FcLike
} from 'react-icons/fc'
import { Category } from '@prisma/client'
import { CategoryItem } from './CategoryItem'
import { IconType } from 'react-icons'

type CategoriesProps = {
    categories: Category[]
}

const iconMap: Record<Category["name"], IconType> = {
    "Personal": FcCamera,
    "Food": FcCloseUpMode,
    "Study": FcAreaChart,
    "Fitness": FcSportsMode,
    "Business": FcBusiness,
    "Love": FcLike
}

export function Categories(props: CategoriesProps) {

    const { categories } = props

  return (
    <div className='flex items-center gap-x-4 overflow-x-auto pb-2'>
        { categories.map((category, key) => (
            <CategoryItem
                key={key}
                id={category.id}
                name={category.name}
                icon={iconMap[category.name]}
            />
        ))}
    </div>
  )
}
