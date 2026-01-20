'use client'

import { useState } from 'react'

interface EmailCollectionFormProps {
  sourceTag?: string
}

export default function EmailCollectionForm({
  sourceTag = 'BDSS - Jan 2026',
}: EmailCollectionFormProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      const response = await fetch('/api/hubspot/submit-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          sourceTag,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit email')
      }

      setMessage({
        type: 'success',
        text: 'Thank you! We\'ll be in touch soon.',
      })
      setEmail('')
    } catch (error) {
      const errorText =
        error instanceof Error ? error.message : 'Something went wrong'
      setMessage({
        type: 'error',
        text: errorText,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="w-full max-w-2xl mx-auto mt-16 mb-8 px-4">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg border border-purple-100">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Stay Updated
          </h2>
          <p className="text-gray-600">
            Get notified about new stories and exclusive BloomFizzy updates
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isLoading ? 'Sending...' : 'Subscribe'}
            </button>
          </div>

          {message && (
            <div
              className={`p-3 rounded-lg text-sm font-medium ${
                message.type === 'success'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {message.text}
            </div>
          )}
        </form>
      </div>
    </section>
  )
}
