'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import StoryForm, { StoryFormData } from '@/components/StoryForm'
import LoadingAnimation from '@/components/LoadingAnimation'
import StoryDisplay from '@/components/StoryDisplay'
import CTASection from '@/components/CTASection'

type AppState = 'form' | 'loading' | 'story'

export default function Home() {
  const [appState, setAppState] = useState<AppState>('form')
  const [formData, setFormData] = useState<StoryFormData>({
    childName: '',
    toyCharacter: '',
    toyName: '',
    storyType: '',
    length: '',
    email: '',
  })
  const [story, setStory] = useState('')
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isLoadingAudio, setIsLoadingAudio] = useState(false)

  const handleSubmit = async () => {
    setAppState('loading')

    try {
      // Submit email to HubSpot
      if (formData.email) {
        try {
          const emailResponse = await fetch('/api/hubspot/submit-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: formData.email.trim(),
              sourceTag: 'BDSS - Jan 2026',
            }),
          })

          if (!emailResponse.ok) {
            console.error('Email submission failed:', emailResponse.status)
          }
        } catch (emailError) {
          console.error('Email submission error:', emailError)
        }
      }

      // Generate story
      const storyResponse = await fetch('/api/generate-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!storyResponse.ok) {
        const errorData = await storyResponse.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to generate story')
      }

      const { story: generatedStory } = await storyResponse.json()
      setStory(generatedStory)
      setAppState('story')

      // Generate audio in background
      setIsLoadingAudio(true)
      try {
        const audioResponse = await fetch('/api/generate-audio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: generatedStory }),
        })

        if (audioResponse.ok) {
          const audioBlob = await audioResponse.blob()
          const url = URL.createObjectURL(audioBlob)
          setAudioUrl(url)
        } else {
          // Log the error details
          const contentType = audioResponse.headers.get('content-type')
          if (contentType && contentType.includes('application/json')) {
            const errorData = await audioResponse.json()
            console.error('Audio generation failed:', errorData)
          } else {
            const errorText = await audioResponse.text()
            console.error('Audio generation failed:', errorText)
          }
        }
      } catch (audioError) {
        console.error('Audio generation error:', audioError)
      } finally {
        setIsLoadingAudio(false)
      }
    } catch (error) {
      console.error('Story generation failed:', error)
      setAppState('form')
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong. Please try again!'
      alert(errorMessage)
    }
  }

  const handleBack = () => {
    // Clean up audio URL
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl)
      setAudioUrl(null)
    }
    setStory('')
    setAppState('form')
  }

  return (
    <main className="min-h-screen">
      <Header />

      <div className="px-4 pb-8">
        {appState === 'loading' && <LoadingAnimation />}

        {appState === 'form' && (
          <StoryForm
            formData={formData}
            onChange={setFormData}
            onSubmit={handleSubmit}
            isLoading={false}
          />
        )}

        {appState === 'story' && (
          <StoryDisplay
            story={story}
            audioUrl={audioUrl}
            isLoadingAudio={isLoadingAudio}
            onBack={handleBack}
          />
        )}

        <CTASection />
      </div>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Made with magic by BloomFizzy</p>
      </footer>
    </main>
  )
}
