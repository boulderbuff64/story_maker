import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { STORY_LENGTHS } from '@/lib/constants'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

interface StoryRequest {
  childName: string
  toyCharacter: string
  toyName: string
  storyTheme: string
  storyVibe: string
  scent: string
  length: string
}

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY is not configured')
      return NextResponse.json(
        { error: 'API key not configured. Please add ANTHROPIC_API_KEY to environment variables.' },
        { status: 500 }
      )
    }

    const body: StoryRequest = await request.json()
    const { childName, toyCharacter, toyName, storyTheme, storyVibe, scent, length } = body

    // Validate required fields
    if (!childName || !toyCharacter || !toyName || !storyTheme || !storyVibe || !scent || !length) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get word count based on length
    const lengthConfig = STORY_LENGTHS.find(l => l.value === length)
    const wordCount = lengthConfig?.words || 400

    // Determine vibe-specific instructions
    let vibeInstructions = ''
    switch (storyVibe) {
      case 'Funny & Silly':
        vibeInstructions = 'Make the story funny, playful, and filled with silly moments that will make a child giggle. Include funny sounds, silly situations, and lighthearted humor.'
        break
      case 'Calm & Sleepy':
        vibeInstructions = 'Make the story calm, soothing, and perfect for bedtime. Use gentle imagery, soft descriptions, and a peaceful pace that helps a child relax and drift off to sleep.'
        break
      case 'Action & Adventure':
        vibeInstructions = 'Make the story exciting with thrilling moments and adventurous scenarios. Include moments of bravery and exploration, but keep it age-appropriate and end on a positive, resolved note.'
        break
    }

    const systemPrompt = `You are a Master Storyteller with a warm, motherly, and slightly dramatic tone. You create magical bedtime stories for children ages 3-7. Your stories are:
- Enchanting and age-appropriate
- Filled with wonder and imagination
- Featuring vivid sensory details
- Always ending on a positive, comforting note
- Written in simple language that young children can understand

Important: Write ONLY the story text. Do not include titles, headings, or any meta-commentary. Start directly with the story.`

    const userPrompt = `Create a personalized bedtime story with these details:

- Child's name: ${childName}
- Their toy friend: A ${toyCharacter} named ${toyName}
- Story theme: ${storyTheme}
- The magical bath bomb scent: ${scent} (weave this scent into the story as a sensory detail - perhaps it's a magical smell in the story world, or the scent of something beautiful the characters encounter)

${vibeInstructions}

The story should be approximately ${wordCount} words. Make ${childName} the hero of the story, with ${toyName} the ${toyCharacter} as their loyal companion and friend.

Remember to:
1. Address the child by name throughout the story
2. Make the toy character (${toyName}) come alive as a magical friend
3. Include the ${scent} scent as a meaningful sensory element
4. Create a complete story arc with a beginning, middle, and satisfying end
5. End with a gentle, comforting conclusion perfect for bedtime`

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      system: systemPrompt,
    })

    // Extract text from response
    const storyText = message.content
      .filter((block): block is Anthropic.TextBlock => block.type === 'text')
      .map(block => block.text)
      .join('\n')

    return NextResponse.json({ story: storyText })
  } catch (error) {
    console.error('Story generation error:', error)

    // Provide more specific error message
    let errorMessage = 'Failed to generate story'
    if (error instanceof Error) {
      errorMessage = error.message
      console.error('Error details:', error.message)
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
