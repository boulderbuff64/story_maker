import { NextRequest, NextResponse } from 'next/server'

interface HubSpotContact {
  properties: {
    email: string
    hs_lead_status?: string
    source_tag?: string
    submission_timestamp?: string
  }
}

interface SubmitEmailRequest {
  email: string
  sourceTag?: string
}

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.HUBSPOT_API_KEY) {
      console.error('HUBSPOT_API_KEY is not configured')
      return NextResponse.json(
        { error: 'HubSpot API key not configured' },
        { status: 500 }
      )
    }

    const body: SubmitEmailRequest = await request.json()
    const { email, sourceTag = 'BDSS - Jan 2026' } = body

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Create contact object for HubSpot
    const contact: HubSpotContact = {
      properties: {
        email: email.toLowerCase(),
        source_tag: sourceTag,
        submission_timestamp: new Date().toISOString(),
      },
    }

    // Submit to HubSpot API
    const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
      },
      body: JSON.stringify(contact),
    })

    // Handle HubSpot response
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('HubSpot API error:', errorData)

      // If contact already exists (409), update it instead
      if (response.status === 409) {
        return NextResponse.json(
          { message: 'Contact already exists', email },
          { status: 200 }
        )
      }

      return NextResponse.json(
        { error: 'Failed to submit to HubSpot' },
        { status: response.status }
      )
    }

    const contactData = await response.json()

    return NextResponse.json(
      {
        message: 'Email submitted successfully',
        contactId: contactData.id,
        email,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Email submission error:', error)

    let errorMessage = 'Failed to submit email'
    if (error instanceof Error) {
      errorMessage = error.message
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
