import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, type, category, authorId } = body

    // Validate required fields
    if (!title || !content || !type || !authorId) {
      return NextResponse.json(
        { error: 'Title, content, type, and author are required' },
        { status: 400 }
      )
    }

    // Validate type
    const validTypes = ['ARTICLE', 'POEM', 'TESTIMONY']
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: 'Invalid submission type' },
        { status: 400 }
      )
    }

    // Validate content length
    if (content.length < 100) {
      return NextResponse.json(
        { error: 'Content must be at least 100 characters long' },
        { status: 400 }
      )
    }

    // Create submission
    const submission = await db.submission.create({
      data: {
        title,
        content,
        type,
        category,
        authorId,
        status: 'PENDING',
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    // TODO: Send email notification to editors
    // You can integrate with email services here

    return NextResponse.json({
      message: 'Submission created successfully',
      submission: {
        id: submission.id,
        title: submission.title,
        type: submission.type,
        status: submission.status,
        submittedAt: submission.submittedAt,
      },
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating submission:', error)
    return NextResponse.json(
      { error: 'Failed to create submission' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const type = searchParams.get('type')
    const authorId = searchParams.get('authorId')
    const limit = searchParams.get('limit')
    const skip = searchParams.get('skip')

    const submissions = await db.submission.findMany({
      where: {
        ...(status && { status }),
        ...(type && { type }),
        ...(authorId && { authorId }),
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        submittedAt: 'desc',
      },
      take: limit ? parseInt(limit) : 50,
      skip: skip ? parseInt(skip) : 0,
    })

    return NextResponse.json(submissions)
  } catch (error) {
    console.error('Error fetching submissions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    )
  }
}