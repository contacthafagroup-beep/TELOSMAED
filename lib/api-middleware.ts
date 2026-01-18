import { NextRequest, NextResponse } from 'next/server'
import { db } from './db'

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

/**
 * Create a standardized API response
 */
export function createApiResponse<T>(
  data?: T,
  message?: string,
  success: boolean = true
): ApiResponse<T> {
  return {
    success,
    ...(data && { data }),
    ...(message && { message }),
  }
}

/**
 * Create an error API response
 */
export function createApiError(
  error: string,
  statusCode: number = 400
): NextResponse {
  return NextResponse.json(
    { success: false, error },
    { status: statusCode }
  )
}

/**
 * Rate limiting middleware
 */
export function rateLimit(
  maxRequests: number = 100,
  windowMs: number = 15 * 60 * 1000 // 15 minutes
) {
  return (request: NextRequest) => {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    const now = Date.now()
    const windowStart = now - windowMs

    // Clean up old entries
    Array.from(rateLimitStore.entries()).forEach(([key, value]) => {
      if (value.resetTime < windowStart) {
        rateLimitStore.delete(key)
      }
    })

    // Check current IP
    const current = rateLimitStore.get(ip)
    
    if (!current) {
      rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs })
      return null // No rate limit exceeded
    }

    if (current.resetTime < now) {
      // Reset window
      rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs })
      return null
    }

    if (current.count >= maxRequests) {
      return createApiError(
        'Rate limit exceeded. Please try again later.',
        429
      )
    }

    // Increment count
    current.count++
    return null
  }
}

/**
 * Validate request body against schema
 */
export function validateRequestBody<T>(
  body: any,
  requiredFields: (keyof T)[],
  optionalFields: (keyof T)[] = []
): { isValid: boolean; errors: string[]; data?: Partial<T> } {
  const errors: string[] = []
  const data: Partial<T> = {}

  // Check required fields
  for (const field of requiredFields) {
    if (!body[field]) {
      errors.push(`${String(field)} is required`)
    } else {
      data[field] = body[field]
    }
  }

  // Include optional fields if present
  for (const field of optionalFields) {
    if (body[field] !== undefined) {
      data[field] = body[field]
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    data: errors.length === 0 ? data : undefined,
  }
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Sanitize HTML content (basic)
 */
export function sanitizeHtml(html: string): string {
  // Basic HTML sanitization - in production, use a proper library like DOMPurify
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
}

/**
 * Check if user has required role
 */
export async function checkUserRole(
  userId: string,
  requiredRoles: string[]
): Promise<boolean> {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { role: true, active: true },
    })

    if (!user || !user.active) {
      return false
    }

    return requiredRoles.includes(user.role)
  } catch (error) {
    console.error('Error checking user role:', error)
    return false
  }
}

/**
 * Pagination helper
 */
export function getPaginationParams(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '10')))
  const skip = (page - 1) * limit

  return { page, limit, skip }
}

/**
 * Search params helper
 */
export function getSearchParams(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  
  return {
    query: searchParams.get('q') || searchParams.get('search') || '',
    category: searchParams.get('category'),
    tag: searchParams.get('tag'),
    author: searchParams.get('author'),
    featured: searchParams.get('featured') === 'true',
    published: searchParams.get('published') !== 'false', // Default to true
    sortBy: searchParams.get('sortBy') || 'publishedAt',
    sortOrder: (searchParams.get('sortOrder') || 'desc') as 'asc' | 'desc',
  }
}

/**
 * Error handler wrapper for API routes
 */
export function withErrorHandler<T extends any[]>(
  handler: (...args: T) => Promise<NextResponse>
) {
  return async (...args: T): Promise<NextResponse> => {
    try {
      return await handler(...args)
    } catch (error) {
      console.error('API Error:', error)
      
      if (error instanceof Error) {
        // Handle known errors
        if (error.message.includes('Unique constraint')) {
          return createApiError('Resource already exists', 409)
        }
        
        if (error.message.includes('Record to update not found')) {
          return createApiError('Resource not found', 404)
        }
        
        if (error.message.includes('Foreign key constraint')) {
          return createApiError('Invalid reference', 400)
        }
      }
      
      return createApiError('Internal server error', 500)
    }
  }
}

/**
 * CORS headers for API responses
 */
export function addCorsHeaders(response: NextResponse): NextResponse {
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  return response
}

/**
 * Handle OPTIONS requests for CORS
 */
export function handleOptions(): NextResponse {
  const response = new NextResponse(null, { status: 200 })
  return addCorsHeaders(response)
}

/**
 * Log API requests (for debugging)
 */
export function logRequest(request: NextRequest, additionalInfo?: any) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[API] ${request.method} ${request.url}`, {
      userAgent: request.headers.get('user-agent'),
      ip: request.ip || request.headers.get('x-forwarded-for'),
      ...additionalInfo,
    })
  }
}