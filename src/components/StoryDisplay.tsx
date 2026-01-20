'use client'

import { useState, useRef, useEffect } from 'react'

interface EmailSignupState {
  email: string
  isLoading: boolean
  message: { type: 'success' | 'error'; text: string } | null
}

interface StoryDisplayProps {
  story: string
  audioUrl: string | null
  isLoadingAudio: boolean
  onBack: () => void
}

export default function StoryDisplay({ story, audioUrl, isLoadingAudio, onBack }: StoryDisplayProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [emailSignup, setEmailSignup] = useState<EmailSignupState>({
    email: '',
    isLoading: false,
    message: null,
  })

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEmailSignup(prev => ({ ...prev, isLoading: true, message: null }))

    try {
      const response = await fetch('/api/hubspot/submit-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailSignup.email.trim(),
          sourceTag: 'Story Completion - Jan 2026',
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit email')
      }

      setEmailSignup({
        email: '',
        isLoading: false,
        message: { type: 'success', text: 'Thank you! Check your inbox for something special.' },
      })
    } catch (error) {
      setEmailSignup(prev => ({
        ...prev,
        isLoading: false,
        message: { type: 'error', text: error instanceof Error ? error.message : 'Something went wrong' },
      }))
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleLoadedMetadata = () => setDuration(audio.duration)
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [audioUrl])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return
    const time = parseFloat(e.target.value)
    audioRef.current.currentTime = time
    setCurrentTime(time)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  // Split story into paragraphs
  const paragraphs = story.split('\n').filter(p => p.trim())

  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in">
      {/* Back button */}
      <button
        onClick={onBack}
        className="mb-4 flex items-center gap-2 text-bloom-purple hover:text-bloom-pink transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Create Another Story
      </button>

      {/* Storybook container */}
      <div className="paper-texture rounded-3xl p-6 md:p-10">
        {/* Audio Player */}
        <div className="mb-8 bg-white/80 rounded-2xl p-4 shadow-inner">
          {audioUrl ? (
            <>
              <audio ref={audioRef} src={audioUrl} />
              <div className="flex items-center gap-4">
                {/* Play/Pause Button */}
                <button
                  onClick={togglePlay}
                  className="w-14 h-14 rounded-full bg-gradient-sunset flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                >
                  {isPlaying ? (
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>

                {/* Progress Bar */}
                <div className="flex-1">
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center gap-3 py-4 text-gray-500">
              {isLoadingAudio ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-bloom-pink" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span>Preparing audio narration...</span>
                </>
              ) : (
                <span>Audio narration unavailable</span>
              )}
            </div>
          )}
        </div>

        {/* Story Title */}
        <div className="text-center mb-8">
          <div className="inline-block px-6 py-2 bg-gradient-sunset rounded-full">
            <span className="text-white font-semibold">Your Magical Story</span>
          </div>
        </div>

        {/* Story Text */}
        <div className="prose prose-lg max-w-none">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-gray-700 leading-relaxed mb-4 text-lg first-letter:text-4xl first-letter:font-bold first-letter:text-bloom-pink first-letter:mr-1 first-letter:float-left"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Decorative footer */}
        <div className="mt-8 text-center">
          <span className="text-3xl font-semibold text-bloom-red">The End</span>
        </div>

        {/* Email Signup Section */}
        <div className="mt-10 pt-8 border-t border-gray-200">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Loved this story?
            </h3>
            <p className="text-gray-600">
              Enter your email to receive something special!
            </p>
          </div>

          <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={emailSignup.email}
                onChange={(e) => setEmailSignup(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter your email"
                required
                disabled={emailSignup.isLoading}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bloom-pink focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={emailSignup.isLoading}
                className="px-6 py-3 bg-bloom-red text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {emailSignup.isLoading ? 'Sending...' : 'Sign Up'}
              </button>
            </div>

            {emailSignup.message && (
              <div
                className={`mt-3 p-3 rounded-lg text-sm font-medium text-center ${
                  emailSignup.message.type === 'success'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {emailSignup.message.text}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
