import Link from 'next/link'
import { Lock } from 'lucide-react'

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="inline-block animate-bounce bg-white rounded-full p-4 shadow-lg">
          <Lock className="h-12 w-12 text-gray-700" />
        </div>
        <h1 className="mt-6 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
          403 - Unauthorized
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Oops! It seems you don't have permission to access this page.
        </p>
        <div className="mt-8">
          <Link 
            href="/user"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-300"
          >
            Go back home
          </Link>
        </div>
        <div className="mt-6 text-sm text-gray-500">
          If you believe this is an error, please contact support.
        </div>
      </div>
    </div>
  )
}

