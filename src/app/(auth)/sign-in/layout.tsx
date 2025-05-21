import type { Metadata } from 'next'
import '@/app/globals.scss'

export const metadata: Metadata = {
  title: 'Sing-in | Black Laundry',
  description: 'Autorizacja do aplikacji Black Laundry',
}

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
 
  )
}
