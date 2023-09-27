import './styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Breadcrumb } from '@/components/Breadcrumb'
import { Header } from '@/components/Header'
import { Provider } from '@/components/Provider'
import { AuthController } from '@/components/AuthController'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Funbase',
  description: 'powered by Nextjs'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body className={inter.className}> 
            <Provider>
                <AuthController>                    
                    <Breadcrumb />
                    <Header />
                    { children }                    
                </AuthController>
            </Provider>           
        </body>
    </html>
  )
}
