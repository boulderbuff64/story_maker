'use client'

import { useState, useRef, useEffect } from 'react'

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
          <span className="text-3xl">✨ The End ✨</span>
        </div>
      </div>
    </div>
  )
}
