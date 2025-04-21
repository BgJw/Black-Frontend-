import type { Metadata } from 'next'
import { Providers } from '@/components/Providers'
import { lazy, ReactNode } from 'react'
import Header from '@/components/common/header'
import Sidebar from '@/components/common/sidebar'
const LazyNotification = lazy(() => import('@/components/notification'));

import './globals.scss'


export const metadata: Metadata = {
    title: 'Black Laundry',
    description: 'Black Corporation',
}

export default function RootLayout({
    children,
}: {
    children: ReactNode
}) {
    return (
        <html lang="en">
            <body className='relative'>
                <Providers>
                    <Header />
                    <div className='main bg-white'>
                        <Sidebar />
                        {children}
                    </div>
                    <LazyNotification />
                </Providers>
            </body>
        </html>
    )
}
