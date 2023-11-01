import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Particles  from "./util/Particles"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'God Is Also a Designer',
}

const MyComponent = () => {
  return (
    <svg>
      <text alignmentBaseline="middle">Hello World</text>
    </svg>
  )
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950">{children}
      <Particles 
className="absolute blur-sm inset-0 -z-10 animate-fade-in"
quantity={100}
/>
      </body>
    </html>
  )
}
