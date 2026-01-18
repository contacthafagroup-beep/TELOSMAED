/**
 * Generate a URL-friendly slug from a title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    // Replace spaces with hyphens
    .replace(/\s+/g, '-')
    // Remove special characters except hyphens
    .replace(/[^\w\-]+/g, '')
    // Replace multiple hyphens with single hyphen
    .replace(/\-\-+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

/**
 * Generate a unique slug by checking against existing slugs
 */
export async function generateUniqueSlug(
  title: string,
  checkFunction: (slug: string) => Promise<boolean>
): Promise<string> {
  let baseSlug = generateSlug(title)
  let slug = baseSlug
  let counter = 1

  // Keep checking until we find a unique slug
  while (await checkFunction(slug)) {
    slug = `${baseSlug}-${counter}`
    counter++
  }

  return slug
}

/**
 * Validate slug format
 */
export function isValidSlug(slug: string): boolean {
  // Slug should only contain lowercase letters, numbers, and hyphens
  // Should not start or end with hyphen
  // Should not contain consecutive hyphens
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
  return slugRegex.test(slug) && slug.length >= 3 && slug.length <= 100
}

/**
 * Clean and validate slug
 */
export function cleanSlug(slug: string): string {
  return generateSlug(slug)
}