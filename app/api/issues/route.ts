import { NextRequest, NextResponse } from 'next/server'
import { db, dbHelpers } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit')
    const skip = searchParams.get('skip')

    // Get issues with filters
    const issues = await dbHelpers.getPublishedIssues({
      featured: featured ? featured === 'true' : undefined,
      limit: limit ? parseInt(limit) : undefined,
      skip: skip ? parseInt(skip) : undefined,
    })

    return NextResponse.json(issues)
  } catch (error) {
    console.error('Error fetching issues:', error)
    return NextResponse.json(
      { error: 'Failed to fetch issues' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      titleAm,
      slug,
      description,
      descriptionAm,
      coverImage,
      theme,
      month,
      year,
      published = false,
      featured = false,
      downloadUrl,
    } = body

    // Validate required fields
    if (!title || !slug || !month || !year) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate month and year
    if (month < 1 || month > 12) {
      return NextResponse.json(
        { error: 'Month must be between 1 and 12' },
        { status: 400 }
      )
    }

    if (year < 2020 || year > new Date().getFullYear() + 1) {
      return NextResponse.json(
        { error: 'Invalid year' },
        { status: 400 }
      )
    }

    // Create issue
    const issue = await db.issue.create({
      data: {
        title,
        titleAm,
        slug,
        description,
        descriptionAm,
        coverImage,
        theme,
        month,
        year,
        published,
        publishedAt: published ? new Date() : null,
        featured,
        downloadUrl,
      },
    })

    return NextResponse.json(issue, { status: 201 })
  } catch (error) {
    console.error('Error creating issue:', error)
    
    // Handle unique constraint violation
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { error: 'An issue for this month and year already exists' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create issue' },
      { status: 500 }
    )
  }
}