import React from 'react'

type TagProps = {
    name: string
}
export function Tag(props: TagProps) {

    const { name } = props
  return (
    <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm md:text-xs font-semibold text-gray-700 mr-2 mb-2'>
        # {name}
    </span>
  )
}
