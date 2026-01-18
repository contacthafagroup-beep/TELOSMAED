import { NextRequest, NextResponse } from 'next/server'
import { db, dbHelpers } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const issue = await dbHelpers.getIssueBySlug(params.slug)

    if (!issue) {
      return NextResponse.json(
        { error: 'Issue not found' },
        { status: 404 }
      )
    }

    // Track page view for analytics
    const userAgent = request.headers.get('user-agent') || undefined
    await dbHelpers.trackPageView(
      `/issues/${params.slug}`,
      userAgent
    )

    return NextResponse.json(issue)
  } catch (error) {
    console.error('Error fetching issue:', error)
    return NextResponse.json(
      { error: 'Failed to fetch issue' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json()
    const {
      title,
      titleAm,
      description,
      descriptionAm,
      coverImage,
      theme,
      published,
      featured,
      downloadUrl,
    } = body

    // Check if issue exists
    const existingIssue = await db.issue.findUnique({
      where: { slug: params.slug },
    })

    if (!existingIssue) {
      return NextResponse.json(
        { error: 'Issue not found' },
        { status: 404 }
      )
    }

    // Update issue
    const issue = await db.issue.update({
      where: { slug: params.slug },
      data: {
        ...(title && { title }),
        ...(titleAm && { titleAm }),
        ...(description && { description }),
        ...(descriptionAm && { descriptionAm }),
        ...(coverImage && { coverImage }),
        ...(theme && { theme }),
        ...(featured !== undefined && { featured }),
        ...(published !== undefined && { 
          published,
          publishedAt: published && !existingIssue.publishedAt ? new Date() : existingIssue.publishedAt
        }),
        ...(downloadUrl && { downloadUrl }),
      },
    })

    return NextResponse.json(issue)
  } catch (error) {
    console.error('Error updating issue:', error)
    return NextResponse.json(
      { error: 'Failed to update issue' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Check if issue exists
    const existingIssue = await db.issue.findUnique({
      where: { slug: params.slug },
    })

    if (!existingIssue) {
      return NextResponse.json(
        { error: 'Issue not found' },
        { status: 404 }
      )
    }

    // Delete issue
    await db.issue.delete({
      where: { slug: params.slug },
    })

    return NextResponse.json({ message: 'Issue deleted successfully' })
  } catch (error) {
    console.error('Error deleting issue:', error)
    return NextResponse.json(
      { error: 'Failed to delete issue' },
      { status: 500 }
    )
  }
}