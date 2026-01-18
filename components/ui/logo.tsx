'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface LogoProps {
  className?: string
  size?: number
}

export function Logo({ className, size = 40 }: LogoProps) {
  const [imageError, setImageError] = useState(false)

  // Fallback SVG logo if image fails to load
  const FallbackLogo = () => (
    <svg
      className={cn('text-primary-600 dark:text-dark-primary', className)}
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cross symbol integrated with modern design - Royal Faith Blue */}
      <rect
        x="18"
        y="4"
        width="4"
        height="32"
        rx="2"
        fill="currentColor"
      />
      <rect
        x="8"
        y="16"
        width="24"
        height="4"
        rx="2"
        fill="currentColor"
      />
      
      {/* Circular frame representing unity and eternity */}
      <circle
        cx="20"
        cy="20"
        r="18"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        opacity="0.6"
      />
      
      {/* Small accent dots representing community */}
      <circle cx="20" cy="6" r="1.5" fill="currentColor" opacity="0.8" />
      <circle cx="34" cy="20" r="1.5" fill="currentColor" opacity="0.8" />
      <circle cx="20" cy="34" r="1.5" fill="currentColor" opacity="0.8" />
      <circle cx="6" cy="20" r="1.5" fill="currentColor" opacity="0.8" />
    </svg>
  )

  if (imageError) {
    return <FallbackLogo />
  }

  return (
    <Image
      src="/images/telos-maed-logo.png"
      alt="TELOS MAED Logo"
      width={size}
      height={size}
      className={cn('object-contain', className)}
      priority
      onError={() => setImageError(true)}
    />
  )
}