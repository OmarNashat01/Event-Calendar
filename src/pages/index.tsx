import Image from 'next/image'
import { Inter } from 'next/font/google'
import EventCalendar from '@/components/calendar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen min-w-[95vw] flex-col items-center justify-between p-24 ${inter.className} bg-slate-600`}
    >
      <EventCalendar />
    </main>
  )
}
