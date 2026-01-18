import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PUT update category
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    
    // Convert features array to JSON string
    const categoryData = {
      ...data,
      features: JSON.stringify(data.features)
    }
    
    const category = await prisma.heroCategory.update({
      where: { id: parseInt(params.id) },
      data: categoryData
    })
    
    return NextResponse.json({
      ...category,
      features: JSON.parse(category.features)
    })
  } catch (error) {
    console.error('Failed to update category:', error)
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 })
  }
}

// DELETE category
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.heroCategory.delete({
      where: { id: parseInt(params.id) }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete category:', error)
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 })
  }
}
