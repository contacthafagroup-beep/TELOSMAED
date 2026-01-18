import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message, type = 'GENERAL' } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      )
    }

    // Validate message length
    if (message.length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters long' },
        { status: 400 }
      )
    }

    // Create contact message
    const contactMessage = await db.contactMessage.create({
      data: {
        name,
        email,
        subject,
        message,
        type,
        status: 'NEW',
      },
    })

    // TODO: Send email notification to admin
    // You can integrate with services like SendGrid, Resend, or Nodemailer here

    return NextResponse.json({
      message: 'Contact message sent successfully',
      id: contactMessage.id,
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating contact message:', error)
    return NextResponse.json(
      { error: 'Failed to send contact message' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const type = searchParams.get('type')
    const limit = searchParams.get('limit')
    const skip = searchParams.get('skip')

    // This endpoint should be protected with authentication in production
    // For now, we'll return all messages with basic filtering

    const messages = await db.contactMessage.findMany({
      where: {
        ...(status && { status }),
        ...(type && { type }),
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit ? parseInt(limit) : 50,
      skip: skip ? parseInt(skip) : 0,
    })

    return NextResponse.json(messages)
  } catch (error) {
    console.error('Error fetching contact messages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contact messages' },
      { status: 500 }
    )
  }
}