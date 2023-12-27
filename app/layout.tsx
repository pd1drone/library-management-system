import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';


import Navigation from "./components/navigation";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Library Management System',
  description: 'Library Management System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <PrimeReactProvider>
      <html lang="en">
        <body className={inter.className}>
        <Navigation />
        <div className='flex flex-col p-5'>
        {children}
        </div>
        </body>
      </html>
    </PrimeReactProvider>
  )
}
