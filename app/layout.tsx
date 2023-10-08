import './styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Breadcrumb } from '@/components/Breadcrumb'
import { Provider } from './context/Provider'
import { AuthProvider } from './context/AuthProvider'

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
        <AuthProvider>
          <Provider>            
            <Breadcrumb />            
              <main className='mt-24'>                
                { children }
              </main>                           
          </Provider>           
        </AuthProvider>
      </body>
    </html>
  )
}
