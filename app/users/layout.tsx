import React, { ReactNode } from 'react'
import { Location } from '@/components/Location'

export default function UserLayout({
    children
}: {
    children: ReactNode
}) {
  return (
    <div>
        <Location />
        <div className=''>
            { children }
        </div>
    </div>
  )
}
