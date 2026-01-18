import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all categories
export async function GET() {
  try {
    const categories = await prisma.heroCategory.findMany({
      orderBy: { order: 'asc' }
    })
    
    // Parse features JSON string back to array
    const categoriesWithFeatures = categories.map(cat => ({
      ...cat,
      features: JSON.parse(cat.features)
    }))
    
    return NextResponse.json(categoriesWithFeatures)
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}

// POST new category
export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Convert features array to JSON string
    const categoryData = {
      ...data,
      features: JSON.stringify(data.features)
    }
    
    const category = await prisma.heroCategory.create({ 
      data: categoryData 
    })
    
    return NextResponse.json({
      ...category,
      features: JSON.parse(category.features)
    })
  } catch (error) {
    console.error('Failed to create category:', error)
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
  }
}
