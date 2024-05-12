import type { Metadata } from 'next'
import { Providers } from '@/components/Providers'
import { ReactNode } from 'react'
import Header from '@/components/common/header/Header'
import Sidebar from '@/components/common/sidebar/Sidebar'
import './globals.scss'

export const metadata: Metadata = {
    title: 'Black',
    description: 'Black Corporation',
}

{/* <ProtectedRoute> */}
export default function RootLayout({
    children,
}: {
    children: ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <Header />
                    <div className='main'>
                        <Sidebar />
                        {children}
                    </div>
                </Providers>
            </body>
        </html>
    )
}
