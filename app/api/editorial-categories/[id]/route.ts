import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const id = parseInt(params.id)

    // Convert arrays to JSON strings if needed
    const data: any = { ...body }
    if (Array.isArray(body.featuresAm)) {
      data.featuresAm = JSON.stringify(body.featuresAm)
    }
    if (Array.isArray(body.featuresEn)) {
      data.featuresEn = JSON.stringify(body.featuresEn)
    }

    const category = await prisma.editorialCategory.update({
      where: { id },
      data
    })

    return NextResponse.json(category)
  } catch (error: any) {
    console.error('Error updating editorial category:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update editorial category' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)

    await prisma.editorialCategory.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Category deleted successfully' })
  } catch (error: any) {
    console.error('Error deleting editorial category:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete editorial category' },
      { status: 500 }
    )
  }
}
