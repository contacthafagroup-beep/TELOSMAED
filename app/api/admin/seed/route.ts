import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST() {
  try {
    // Check if data already exists
    const existingArticles = await db.article.count()
    if (existingArticles > 0) {
      return NextResponse.json({ message: 'Database already seeded', count: existingArticles })
    }

    // Create sample users
    const user1 = await db.user.create({
      data: {
        email: 'editor@telosmaed.com',
        name: 'Samuel Tadesse',
        role: 'EDITOR',
        bio: 'Chief Editor of TELOS MAED',
        verified: true,
      }
    })

    const user2 = await db.user.create({
      data: {
        email: 'writer@telosmaed.com',
        name: 'Ruth Alemayehu',
        role: 'CONTRIBUTOR',
        bio: 'Contributing Writer',
        verified: true,
      }
    })

    // Create sample articles
    await db.article.create({
      data: {
        title: 'The Art of Christian Leadership',
        titleAm: 'የክርስቲያን አመራር ጥበብ',
        slug: 'the-art-of-christian-leadership',
        excerpt: 'Exploring servant leadership through biblical principles.',
        excerptAm: 'በመጽሐፍ ቅዱስ መርሆዎች የአገልጋይ አመራርን መመርመር።',
        content: 'Leadership in the Christian context is fundamentally different from worldly leadership...',
        contentAm: 'በክርስቲያናዊ አውድ ውስጥ አመራር ከዓለማዊ አመራር በመሠረቱ የተለየ ነው...',
        category: 'LEADERSHIP',
        tags: 'leadership,christian,servant',
        featured: true,
        published: true,
        publishedAt: new Date(),
        readTime: 8,
        views: 245,
        likes: 12,
        authorId: user1.id,
      }
    })

    await db.article.create({
      data: {
        title: 'Finding Peace in Turbulent Times',
        titleAm: 'በተወዛጋቢ ጊዜዎች ሰላም ማግኘት',
        slug: 'finding-peace-in-turbulent-times',
        excerpt: 'How faith anchors us during life\'s storms.',
        excerptAm: 'እምነት በሕይወት አውሎ ነፋሶች ወቅት እንዴት እንደሚያጽናናን።',
        content: 'In times of uncertainty and chaos, our faith becomes our anchor...',
        contentAm: 'በእርግጠኛ ባልሆነ እና በትርምስ ጊዜ፣ እምነታችን መልህቃችን ይሆናል...',
        category: 'PERSONAL',
        tags: 'peace,faith,personal growth',
        featured: false,
        published: true,
        publishedAt: new Date(),
        readTime: 6,
        views: 189,
        likes: 8,
        authorId: user2.id,
      }
    })

    // Create sample poems
    await db.poem.create({
      data: {
        title: 'Grace Like Morning Dew',
        titleAm: 'እንደ ጠዋት ቤዛ ጸጋ',
        slug: 'grace-like-morning-dew',
        content: 'Grace falls like morning dew,\nFresh and new each day...',
        contentAm: 'ጸጋ እንደ ጠዋት ቤዛ ይወርዳል፣\nየቀን ትኩስ እና አዲስ...',
        type: 'SPIRITUAL',
        featured: true,
        published: true,
        publishedAt: new Date(),
        views: 156,
        likes: 15,
        authorId: user2.id,
      }
    })

    // Create hero video
    await db.heroVideo.create({
      data: {
        title: 'Watch Our Story',
        titleAm: 'የእኛን ታሪክ ይመልከቱ',
        description: 'Discover Our Mission',
        descriptionAm: 'ተልእኮአችንን ያውቁ',
        videoUrl: 'https://youtu.be/dQw4w9WgXcQ',
        isActive: true,
      }
    })

    // Create hero categories
    const categories = [
      {
        nameEn: 'Editorial Notes',
        nameAm: 'የአዘጋጁ ማስታወሻ',
        descEn: 'Insights from our editorial team',
        descAm: 'ከአዘጋጆች ቡድናችን ግንዛቤዎች',
        icon: 'DocumentTextIcon',
        color: 'blue',
        href: '/articles?category=EDITORIAL',
        amharicTitle: 'የአዘጋጁ ማስታወሻ',
        amharicDescription: 'ከአዘጋጆች ቡድናችን ግንዛቤዎች',
        features: JSON.stringify(['Deep Analysis', 'Expert Commentary', 'Spiritual Insights']),
        isActive: true,
        order: 1,
      },
      {
        nameEn: 'Personal Growth',
        nameAm: 'ግላዊ እድገት',
        descEn: 'Journey of spiritual development',
        descAm: 'የመንፈሳዊ እድገት ጉዞ',
        icon: 'UserIcon',
        color: 'green',
        href: '/articles?category=PERSONAL',
        amharicTitle: 'ግላዊ እድገት',
        amharicDescription: 'የመንፈሳዊ እድገት ጉዞ',
        features: JSON.stringify(['Character Building', 'Faith Development', 'Life Transformation']),
        isActive: true,
        order: 2,
      }
    ]

    for (const category of categories) {
      await db.heroCategory.create({ data: category })
    }

    const articleCount = await db.article.count()
    const poemCount = await db.poem.count()

    return NextResponse.json({ 
      message: 'Database seeded successfully!',
      data: {
        articles: articleCount,
        poems: poemCount,
        users: 2,
        heroCategories: categories.length
      }
    })

  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json(
      { error: 'Failed to seed database', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}