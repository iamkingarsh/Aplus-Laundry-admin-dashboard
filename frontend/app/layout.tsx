import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { NewOrderModalProvider } from '@/components/providers/NewOrderModal-Provider'
import { ToastProvider } from '@/components/providers/toast-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Login to Admin Dashboard | APLus Laundry',
  description: 'Login to Admin Dashboard | APLus Laundry',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userSignedIn = false
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          disableTransitionOnChange
        >
          <ToastProvider />
          <NewOrderModalProvider />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}