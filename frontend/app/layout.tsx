"use client";
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { NewOrderModalProvider } from '@/components/providers/NewOrderModal-Provider'
import { ToastProvider } from '@/components/providers/toast-provider'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'], variable: "--font-sans", })



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [defaultTheme, setDefaultTheme] = useState('light')

  useEffect(() => {
    const getThemePreference = async () => {
      if (typeof window !== 'undefined') {
        const theme = localStorage.getItem('theme')
        console.log(theme)
        if (theme) {
          setDefaultTheme(theme)
        } else {
          setDefaultTheme('system')
        }
      }
    }

    getThemePreference()
  }, [])

  //get theme preference by resolving promise


  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme={defaultTheme}
          enableSystem={true}
          disableTransitionOnChange={false}
        >
          <ToastProvider />
          <NewOrderModalProvider />
          {children}
        </ThemeProvider>

      </body>
    </html>
  )
}
