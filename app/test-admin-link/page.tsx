'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function TestAdminLink() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center">Admin Link Test</h1>
        
        <div className="space-y-4">
          <div>
            <h2 className="font-semibold mb-2">Test 1: Next.js Link</h2>
            <Link 
              href="/admin"
              className="block w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-center"
            >
              Go to Admin (Link)
            </Link>
          </div>

          <div>
            <h2 className="font-semibold mb-2">Test 2: Router Push</h2>
            <button
              onClick={() => router.push('/admin')}
              className="block w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Go to Admin (Router)
            </button>
          </div>

          <div>
            <h2 className="font-semibold mb-2">Test 3: Window Location</h2>
            <button
              onClick={() => window.location.href = '/admin'}
              className="block w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Go to Admin (Window)
            </button>
          </div>

          <div>
            <h2 className="font-semibold mb-2">Test 4: Regular Anchor</h2>
            <a 
              href="/admin"
              className="block w-full px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 text-center"
            >
              Go to Admin (Anchor)
            </a>
          </div>
        </div>

        <div className="mt-8 p-4 bg-gray-100 rounded">
          <h3 className="font-semibold mb-2">Instructions:</h3>
          <ol className="list-decimal list-inside text-sm space-y-1">
            <li>Try each button/link above</li>
            <li>Check which one works</li>
            <li>Check console for any errors</li>
            <li>Report back which method works</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
