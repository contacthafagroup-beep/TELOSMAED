import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, preferences } = body

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingSubscription = await db.newsletterSubscription.findUnique({
      where: { email },
    })

    if (existingSubscription) {
      if (existingSubscription.active) {
        return NextResponse.json(
          { error: 'Email is already subscribed' },
          { status: 409 }
        )
      } else {
        // Reactivate subscription
        const subscription = await db.newsletterSubscription.update({
          where: { email },
          data: {
            active: true,
            name: name || existingSubscription.name,
            preferences: preferences || existingSubscription.preferences,
          },
        })

        return NextResponse.json({
          message: 'Newsletter subscription reactivated successfully',
          subscription: {
            id: subscription.id,
            email: subscription.email,
            name: subscription.name,
            active: subscription.active,
          },
        })
      }
    }

    // Create new subscription
    const subscription = await db.newsletterSubscription.create({
      data: {
        email,
        name,
        preferences,
        active: true,
      },
    })

    return NextResponse.json({
      message: 'Newsletter subscription created successfully',
      subscription: {
        id: subscription.id,
        email: subscription.email,
        name: subscription.name,
        active: subscription.active,
      },
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating newsletter subscription:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Check if subscription exists
    const existingSubscription = await db.newsletterSubscription.findUnique({
      where: { email },
    })

    if (!existingSubscription) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      )
    }

    // Deactivate subscription (soft delete)
    await db.newsletterSubscription.update({
      where: { email },
      data: { active: false },
    })

    return NextResponse.json({
      message: 'Newsletter subscription cancelled successfully',
    })
  } catch (error) {
    console.error('Error cancelling newsletter subscription:', error)
    return NextResponse.json(
      { error: 'Failed to cancel newsletter subscription' },
      { status: 500 }
    )
  }
}