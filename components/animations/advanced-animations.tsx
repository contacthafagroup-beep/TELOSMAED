'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimation, PanInfo } from 'framer-motion'

// Particle System Component
export function ParticleSystem({ 
  particleCount = 50, 
  color = '#3B82F6', 
  size = 2,
  speed = 1,
  interactive = true 
}: {
  particleCount?: number
  color?: string
  size?: number
  speed?: number
  interactive?: boolean
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [particles, setParticles] = useState<Array<{
    id: number
    x: number
    y: number
    vx: number
    vy: number
    size: number
    opacity: number
    color: string
  }>>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollY } = useScroll()

  // Initialize particles
  useEffect(() => {
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * (window.innerWidth || 1000),
      y: Math.random() * (window.innerHeight || 800),
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      size: Math.random() * size + 1,
      opacity: Math.random() * 0.8 + 0.2,
      color: color
    }))
    setParticles(newParticles)
  }, [particleCount, color, size, speed])

  // Mouse tracking
  useEffect(() => {
    if (!interactive) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [interactive])

  // Animate particles
  useEffect(() => {
    const animateParticles = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          let { x, y, vx, vy } = particle

          // Mouse interaction
          if (interactive) {
            const dx = mousePosition.x - x
            const dy = mousePosition.y - y
            const distance = Math.sqrt(dx * dx + dy * dy)
            
            if (distance < 100) {
              const force = (100 - distance) / 100
              vx += (dx / distance) * force * 0.1
              vy += (dy / distance) * force * 0.1
            }
          }

          // Scroll interaction
          const scrollInfluence = scrollY.get() * 0.001
          vx += Math.sin(scrollInfluence + particle.id) * 0.02
          vy += Math.cos(scrollInfluence + particle.id) * 0.02

          // Update position
          x += vx
          y += vy

          // Boundary collision
          if (x < 0 || x > (window.innerWidth || 1000)) vx *= -0.8
          if (y < 0 || y > (window.innerHeight || 800)) vy *= -0.8

          // Friction
          vx *= 0.99
          vy *= 0.99

          return { ...particle, x, y, vx, vy }
        })
      )
    }

    const interval = setInterval(animateParticles, 16) // ~60fps
    return () => clearInterval(interval)
  }, [mousePosition, scrollY, interactive])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.opacity,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [particle.opacity, particle.opacity * 0.5, particle.opacity],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

// Morphing Shape Component
export function MorphingShape({ 
  content,
  className = "",
  baseColor = "#3B82F6",
  accentColor = "#F59E0B"
}: {
  content?: string
  className?: string
  baseColor?: string
  accentColor?: string
}) {
  const [currentShape, setCurrentShape] = useState(0)
  const { scrollY } = useScroll()
  
  const shapes = [
    "M50,10 L90,90 L10,90 Z", // Triangle
    "M50,10 Q90,50 50,90 Q10,50 50,10", // Leaf
    "M20,50 Q50,10 80,50 Q50,90 20,50", // Diamond
    "M50,20 Q80,50 50,80 Q20,50 50,20", // Circle-ish
  ]

  const pathVariants = {
    shape1: { d: shapes[0] },
    shape2: { d: shapes[1] },
    shape3: { d: shapes[2] },
    shape4: { d: shapes[3] },
  }

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      const shapeIndex = Math.floor((latest / 200) % shapes.length)
      setCurrentShape(shapeIndex)
    })
    return unsubscribe
  }, [scrollY, shapes.length])

  return (
    <div className={`relative ${className}`}>
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="morphGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={baseColor} />
            <stop offset="100%" stopColor={accentColor} />
          </linearGradient>
        </defs>
        <motion.path
          fill="url(#morphGradient)"
          initial="shape1"
          animate={`shape${currentShape + 1}` as keyof typeof pathVariants}
          variants={pathVariants}
          transition={{
            duration: 1.5,
            ease: "easeInOut"
          }}
        />
      </svg>
      {content && (
        <div className="relative z-10 flex items-center justify-center h-full text-white font-bold">
          {content}
        </div>
      )}
    </div>
  )
}

// Physics-based Interactive Element
export function PhysicsElement({ 
  children,
  className = "",
  mass = 1,
  friction = 0.8,
  elasticity = 0.6
}: {
  children: React.ReactNode
  className?: string
  mass?: number
  friction?: number
  elasticity?: number
}) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const controls = useAnimation()
  
  const springX = useSpring(x, { stiffness: 300, damping: 30 })
  const springY = useSpring(y, { stiffness: 300, damping: 30 })

  const handleDrag = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Apply physics calculations
    const velocityX = info.velocity.x * mass
    const velocityY = info.velocity.y * mass
    
    x.set(info.offset.x)
    y.set(info.offset.y)
  }, [x, y, mass])

  const handleDragEnd = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Apply elasticity and friction
    const finalX = info.offset.x * elasticity * friction
    const finalY = info.offset.y * elasticity * friction
    
    controls.start({
      x: finalX,
      y: finalY,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        mass: mass
      }
    })
  }, [controls, elasticity, friction, mass])

  return (
    <motion.div
      className={className}
      drag
      dragElastic={elasticity}
      dragMomentum={false}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      animate={controls}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.div>
  )
}

// Gesture-controlled Component
export function GestureController({ 
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onPinch,
  className = ""
}: {
  children: React.ReactNode
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  onPinch?: (scale: number) => void
  className?: string
}) {
  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0)

  const handlePan = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info
    const swipeThreshold = 50
    const velocityThreshold = 500

    // Detect swipe gestures
    if (Math.abs(velocity.x) > velocityThreshold || Math.abs(offset.x) > swipeThreshold) {
      if (offset.x > 0 && onSwipeRight) {
        onSwipeRight()
      } else if (offset.x < 0 && onSwipeLeft) {
        onSwipeLeft()
      }
    }

    if (Math.abs(velocity.y) > velocityThreshold || Math.abs(offset.y) > swipeThreshold) {
      if (offset.y > 0 && onSwipeDown) {
        onSwipeDown()
      } else if (offset.y < 0 && onSwipeUp) {
        onSwipeUp()
      }
    }
  }, [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown])

  // Pinch gesture simulation (for demo purposes)
  const handleWheel = useCallback((event: WheelEvent) => {
    event.preventDefault()
    const newScale = scale + (event.deltaY > 0 ? -0.1 : 0.1)
    const clampedScale = Math.max(0.5, Math.min(2, newScale))
    setScale(clampedScale)
    if (onPinch) {
      onPinch(clampedScale)
    }
  }, [scale, onPinch])

  useEffect(() => {
    const element = document.getElementById('gesture-controller')
    if (element) {
      element.addEventListener('wheel', handleWheel, { passive: false })
      return () => element.removeEventListener('wheel', handleWheel)
    }
  }, [handleWheel])

  return (
    <motion.div
      id="gesture-controller"
      className={className}
      drag
      onPan={handlePan}
      animate={{ scale, rotate: rotation }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      whileHover={{ scale: scale * 1.05 }}
      onDoubleClick={() => {
        setRotation(prev => prev + 90)
        setScale(prev => prev === 1 ? 1.2 : 1)
      }}
    >
      {children}
    </motion.div>
  )
}

// Scroll-responsive Animation Container
export function ScrollAnimationContainer({ 
  children,
  className = "",
  triggerOffset = 0.1
}: {
  children: React.ReactNode
  className?: string
  triggerOffset?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${1 - triggerOffset}`, `end ${triggerOffset}`]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ opacity, scale, y, rotate }}
    >
      {children}
    </motion.div>
  )
}

// Advanced Background Animation
export function AdvancedBackground() {
  const { scrollY } = useScroll()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const backgroundY = useTransform(scrollY, [0, 1000], [0, -200])
  const backgroundRotate = useTransform(scrollY, [0, 1000], [0, 10])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`,
          y: backgroundY,
          rotate: backgroundRotate
        }}
      />
      
      {/* Floating geometric shapes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${10 + (i * 12)}%`,
            top: `${15 + (i * 8)}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 360],
            scale: [0.8, 1.2, 0.8],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5
          }}
        >
          <div 
            className={`w-6 h-6 ${i % 2 === 0 ? 'rounded-full' : 'rotate-45'}`}
            style={{
              background: `linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(245, 158, 11, 0.2))`,
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}