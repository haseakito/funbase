import Sidebar from '@/components/Sidebar'
import React, { ReactNode } from 'react'

export default function ProfileLayout({
    children
}: {
    children: ReactNode
}) {
    return (
        <div>
            <section>
                <Sidebar />
            </section>
            {children}
        </div>        
    )
}
