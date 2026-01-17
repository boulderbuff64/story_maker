import { NextRequest, NextResponse } from 'next/server'

// ElevenLabs voice ID for storytelling
// Rachel - warm, engaging female voice, great for children's stories
const VOICE_ID = '21m00Tcm4TlvDq8ikWAM'

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()

    if (!text) {
      console.error('No text provided for audio generation')
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      )
    }

    const apiKey = process.env.ELEVENLABS_API_KEY
    if (!apiKey) {
      console.error('ELEVENLABS_API_KEY is not configured')
      return NextResponse.json(
        { error: 'ElevenLabs API key not configured' },
        { status: 500 }
      )
    }

    console.log('Generating audio with voice ID:', VOICE_ID)
    console.log('Text length:', text.length, 'characters')

    // Call ElevenLabs Text-to-Speech API
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': apiKey,
        },
        body: JSON.stringify({
          text: text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.65,
            similarity_boost: 0.75,
            style: 0.5,
            use_speaker_boost: true,
          },
        }),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('ElevenLabs API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
        voiceId: VOICE_ID,
      })

      // Return a more user-friendly error
      let errorMessage = 'Failed to generate audio narration'
      if (response.status === 401) {
        errorMessage = 'ElevenLabs API authentication failed. Please check your API key.'
      } else if (response.status === 403) {
        errorMessage = 'ElevenLabs API access denied. Please check your subscription.'
      } else if (response.status === 429) {
        errorMessage = 'ElevenLabs API rate limit reached. Please try again later.'
      }

      return NextResponse.json(
        { error: errorMessage, details: errorText },
        { status: response.status }
      )
    }

    console.log('Audio generated successfully')

    // Get the audio data as a buffer
    const audioBuffer = await response.arrayBuffer()

    // Return the audio file
    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.byteLength.toString(),
      },
    })
  } catch (error) {
    console.error('Audio generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate audio' },
      { status: 500 }
    )
  }
}
