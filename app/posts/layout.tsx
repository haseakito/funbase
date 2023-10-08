import { Location } from '@/components/Location'
import React, { ReactNode } from 'react'

export default function PostLayout({
    children
}: {
    children: ReactNode
}) {

  return (
    <main>
        <Location />
        <div>
            { children }
        </div>
    </main>
  )
}
