import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { STORY_LENGTHS } from '@/lib/constants'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

interface StoryRequest {
  childName?: string
  toyCharacter?: string
  toyName?: string
  storyType?: string
  length?: string
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
    let { childName, toyCharacter, toyName, storyType, length } = body

    // Provide defaults for optional fields
    childName = childName || 'a brave little explorer'
    toyCharacter = toyCharacter || 'magical creature'
    toyName = toyName || 'Friend'
    storyType = storyType || 'adventure'
    length = length || 'medium'

    // Get word count based on length
    const lengthConfig = STORY_LENGTHS.find(l => l.value === length)
    const wordCount = lengthConfig?.words || 400

    // Determine story type-specific instructions
    let typeInstructions = ''
    switch (storyType) {
      case 'rhythmic-rhyme':
        typeInstructions = 'Write the story in rhythmic, rhyming verse. Create a playful, musical flow with consistent rhyme schemes (like AABB or ABAB). Make it fun to read aloud with a bouncy, engaging rhythm that children will love to hear repeated.'
        break
      case 'adventure':
        typeInstructions = 'Make the story an exciting adventure filled with exploration, discovery, and mild challenges. Include moments of bravery, problem-solving, and triumph. Keep it age-appropriate with a positive resolution.'
        break
      case 'fairy-tale':
        typeInstructions = 'Write in a classic fairy tale style with "Once upon a time" beginnings, magical elements, gentle lessons, and a "happily ever after" ending. Include enchanted settings, wonder, and timeless storytelling.'
        break
      case 'bedtime-soother':
        typeInstructions = 'Create a calm, soothing, gentle story perfect for bedtime. Use peaceful imagery, soft descriptions, and a relaxing pace. Include calming elements like stars, moonlight, soft whispers, and cozy feelings that help a child wind down and feel safe.'
        break
      case 'onomatopoeia':
        typeInstructions = 'Fill the story with fun sound effects and onomatopoeia throughout! Include sounds like CRASH, ZOOM, SPLASH, BEEP, SQUISH, POP, WHOOSH, BUZZ, DING, SWOOSH, etc. Make it playful and interactive with lots of expressive sound words that bring the action to life.'
        break
    }

    const systemPrompt = `You are a Master Storyteller with a warm, engaging, and slightly dramatic tone. You create magical stories for children ages 3-7. Your stories are:
- Enchanting and age-appropriate
- Filled with wonder and imagination
- Featuring vivid sensory details
- Always ending on a positive, satisfying note
- Written in simple language that young children can understand

Important:
- Write ONLY the story text. Do not include titles, headings, or any meta-commentary. Start directly with the story.
- Do NOT use asterisks (*), underscores (_), or any markdown formatting in the story text.
- Use plain text only - the story will be read aloud by a voice narrator.`

    const userPrompt = `Create a personalized story with these details:

- Child's name: ${childName}
- Their toy friend: A ${toyCharacter} named ${toyName}
- Story type: ${storyType}

${typeInstructions}

The story should be approximately ${wordCount} words. Make ${childName} the hero of the story, with ${toyName} the ${toyCharacter} as their loyal companion and friend.

Remember to:
1. Address the child by name throughout the story
2. Make the toy character (${toyName}) come alive as a magical friend
3. Follow the story type instructions carefully to create the right style and tone
4. Create a complete story arc with a beginning, middle, and satisfying end
5. End with an uplifting, positive conclusion that leaves the child feeling happy and inspired`

    const message = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
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
