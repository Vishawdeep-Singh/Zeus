import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'User Profile | FitTrack',
  description: 'View your fitness profile and gym memberships',
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-200 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300 ease-in-out">
      <main className="py-8 animate-fadeIn">{children}</main>
    </div>
  )
}

