import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET video
export async function GET() {
  try {
    let video = await prisma.heroVideo.findFirst()
    
    // If no video exists, create default one
    if (!video) {
      video = await prisma.heroVideo.create({
        data: {
          title: 'Watch Our Story',
          titleAm: 'የእኛን ታሪክ ይመልከቱ',
          description: 'Discover Our Mission',
          descriptionAm: 'ተልእኳችንን ያውቁ',
          videoUrl: '',
          isActive: true
        }
      })
    }
    
    return NextResponse.json(video)
  } catch (error) {
    console.error('Failed to fetch video:', error)
    return NextResponse.json({ error: 'Failed to fetch video' }, { status: 500 })
  }
}

// PUT update video
export async function PUT(request: Request) {
  try {
    const data = await request.json()
    
    // Get the first video or create if doesn't exist
    let video = await prisma.heroVideo.findFirst()
    
    if (video) {
      video = await prisma.heroVideo.update({
        where: { id: video.id },
        data
      })
    } else {
      video = await prisma.heroVideo.create({
        data
      })
    }
    
    return NextResponse.json(video)
  } catch (error) {
    console.error('Failed to update video:', error)
    return NextResponse.json({ error: 'Failed to update video' }, { status: 500 })
  }
}
