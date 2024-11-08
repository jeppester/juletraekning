import { PropsWithChildren } from 'react'

export default function MainLayout({ children }: PropsWithChildren & { backgroundImage: string }) {
  return (
    <main className="w-full min-h-full px-4 py-20 flex flex-col justify-around items-center">
      {children}
    </main>
  )
}
