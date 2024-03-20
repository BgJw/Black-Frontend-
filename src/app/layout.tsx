import type { Metadata } from 'next'
import { Providers } from '@/components/Providers'
import { ReactNode } from 'react'


import './globals.scss'
import Header from '@/components/common/header/Header'
import Sidebar from '@/components/common/sidebar/Sidebar'

export const metadata: Metadata = {
    title: 'Black',
    description: 'Black Corporation',
}

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
                    <div className='position'>
                        <Sidebar />
                        {children}
                    </div>
                </Providers>
            </body>
        </html>
    )
}
