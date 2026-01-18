import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

// Database helper functions
export const dbHelpers = {
  // Article helpers
  async getPublishedArticles(options?: {
    category?: string
    featured?: boolean
    limit?: number
    skip?: number
  }) {
    return db.article.findMany({
      where: {
        published: true,
        ...(options?.category && { category: options.category }),
        ...(options?.featured !== undefined && { featured: options.featured }),
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
            bio: true,
          },
        },
        issue: {
          select: {
            id: true,
            title: true,
            slug: true,
            month: true,
            year: true,
          },
        },
        _count: {
          select: {
            comments: true,
            articleLikes: true,
            bookmarks: true,
          },
        },
      },
      orderBy: {
        publishedAt: 'desc',
      },
      take: options?.limit,
      skip: options?.skip,
    })
  },

  async getArticleBySlug(slug: string) {
    return db.article.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
            bio: true,
            website: true,
            social: true,
          },
        },
        issue: {
          select: {
            id: true,
            title: true,
            slug: true,
            month: true,
            year: true,
            coverImage: true,
          },
        },
        comments: {
          where: { approved: true, parentId: null },
          include: {
            author: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
            replies: {
              include: {
                author: {
                  select: {
                    id: true,
                    name: true,
                    avatar: true,
                  },
                },
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: {
            comments: true,
            articleLikes: true,
            bookmarks: true,
          },
        },
      },
    })
  },

  // Poem helpers
  async getPublishedPoems(options?: {
    featured?: boolean
    limit?: number
    skip?: number
  }) {
    return db.poem.findMany({
      where: {
        published: true,
        ...(options?.featured !== undefined && { featured: options.featured }),
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
            bio: true,
          },
        },
        _count: {
          select: {
            comments: true,
            poemLikes: true,
            bookmarks: true,
          },
        },
      },
      orderBy: {
        publishedAt: 'desc',
      },
      take: options?.limit,
      skip: options?.skip,
    })
  },

  async getPoemBySlug(slug: string) {
    return db.poem.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
            bio: true,
            website: true,
            social: true,
          },
        },
        comments: {
          where: { approved: true, parentId: null },
          include: {
            author: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
            replies: {
              include: {
                author: {
                  select: {
                    id: true,
                    name: true,
                    avatar: true,
                  },
                },
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: {
            comments: true,
            poemLikes: true,
            bookmarks: true,
          },
        },
      },
    })
  },

  // Issue helpers
  async getPublishedIssues(options?: {
    featured?: boolean
    limit?: number
    skip?: number
  }) {
    return db.issue.findMany({
      where: {
        published: true,
        ...(options?.featured !== undefined && { featured: options.featured }),
      },
      include: {
        _count: {
          select: {
            articles: true,
            poems: true,
          },
        },
      },
      orderBy: [
        { year: 'desc' },
        { month: 'desc' },
      ],
      take: options?.limit,
      skip: options?.skip,
    })
  },

  async getIssueBySlug(slug: string) {
    return db.issue.findUnique({
      where: { slug },
      include: {
        articles: {
          where: { published: true },
          include: {
            author: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
            _count: {
              select: {
                comments: true,
                articleLikes: true,
              },
            },
          },
          orderBy: { publishedAt: 'desc' },
        },
        poems: {
          where: { published: true },
          include: {
            author: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
            _count: {
              select: {
                comments: true,
                poemLikes: true,
              },
            },
          },
          orderBy: { publishedAt: 'desc' },
        },
      },
    })
  },

  // User helpers
  async getUserByEmail(email: string) {
    return db.user.findUnique({
      where: { email },
      include: {
        _count: {
          select: {
            articles: true,
            poems: true,
            comments: true,
          },
        },
      },
    })
  },

  // Analytics helpers
  async trackPageView(path: string, userAgent?: string, country?: string, referrer?: string) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return db.analytics.upsert({
      where: {
        path_date: {
          path,
          date: today,
        },
      },
      update: {
        views: {
          increment: 1,
        },
      },
      create: {
        path,
        date: today,
        views: 1,
        userAgent,
        country,
        referrer,
      },
    })
  },

  // Search helpers
  async searchContent(query: string, options?: {
    type?: 'articles' | 'poems' | 'all'
    limit?: number
  }) {
    const limit = options?.limit || 10
    const searchQuery = `%${query}%`

    if (options?.type === 'articles') {
      return {
        articles: await db.article.findMany({
          where: {
            published: true,
            OR: [
              { title: { contains: query } },
              { titleAm: { contains: query } },
              { excerpt: { contains: query } },
              { excerptAm: { contains: query } },
              { content: { contains: query } },
              { contentAm: { contains: query } },
            ],
          },
          include: {
            author: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
          take: limit,
        }),
        poems: [],
      }
    }

    if (options?.type === 'poems') {
      return {
        articles: [],
        poems: await db.poem.findMany({
          where: {
            published: true,
            OR: [
              { title: { contains: query } },
              { titleAm: { contains: query } },
              { content: { contains: query } },
              { contentAm: { contains: query } },
            ],
          },
          include: {
            author: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
          take: limit,
        }),
      }
    }

    // Search both articles and poems
    const [articles, poems] = await Promise.all([
      db.article.findMany({
        where: {
          published: true,
          OR: [
            { title: { contains: query } },
            { titleAm: { contains: query } },
            { excerpt: { contains: query } },
            { excerptAm: { contains: query } },
            { content: { contains: query } },
            { contentAm: { contains: query } },
          ],
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
        take: Math.ceil(limit / 2),
      }),
      db.poem.findMany({
        where: {
          published: true,
          OR: [
            { title: { contains: query } },
            { titleAm: { contains: query } },
            { content: { contains: query } },
            { contentAm: { contains: query } },
          ],
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
        take: Math.floor(limit / 2),
      }),
    ])

    return { articles, poems }
  },

  // Settings helpers
  async getSetting(key: string) {
    const setting = await db.settings.findUnique({
      where: { key },
    })

    if (!setting) return null

    switch (setting.type) {
      case 'NUMBER':
        return Number(setting.value)
      case 'BOOLEAN':
        return setting.value === 'true'
      case 'JSON':
        return JSON.parse(setting.value)
      default:
        return setting.value
    }
  },

  async setSetting(key: string, value: any, type: string = 'STRING') {
    let stringValue: string

    switch (type) {
      case 'NUMBER':
        stringValue = String(value)
        break
      case 'BOOLEAN':
        stringValue = String(Boolean(value))
        break
      case 'JSON':
        stringValue = JSON.stringify(value)
        break
      default:
        stringValue = String(value)
    }

    return db.settings.upsert({
      where: { key },
      update: { value: stringValue, type },
      create: { key, value: stringValue, type },
    })
  },
}