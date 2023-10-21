import Image from 'next/image'
import { Inter } from 'next/font/google'
import Game from '@/components/Game'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex flex-col relative items-center ${inter.className}`}
    >
      <Game />
    </main>
  )
}
