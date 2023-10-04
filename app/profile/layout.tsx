import { Location } from '@/components/Location'
import Sidebar from '@/components/Sidebar'
import React, { ReactNode } from 'react'

export default function ProfileLayout({
    children
}: {
    children: ReactNode
}) {
    return (
        <div>
            <section className='fixed md:flex left-0 top-20 z-50 h-full w-24 lg:w-64 transition-transform -translate-x-full md:translate-x-0'>
                <Sidebar />
            </section>
            <main className='md:pl-32 lg:pl-56 h-full'>
                <Location />
                {children}
            </main>
        </div>        
    )
}
