import nodemailer from 'nodemailer'
import { welcomeEmailTemplate, newArticleNotificationTemplate, weeklyDigestTemplate } from './email-templates'

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

// Verify transporter configuration
export async function verifyEmailConfig() {
  try {
    await transporter.verify()
    console.log('Email server is ready')
    return true
  } catch (error) {
    console.error('Email server error:', error)
    return false
  }
}

// Send password reset email
export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.SITE_URL}/reset-password?token=${token}`
  
  const mailOptions = {
    from: process.env.SMTP_FROM || 'noreply@telosmaed.com',
    to: email,
    subject: 'Password Reset Request - TELOS MAED',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Password Reset Request</h2>
        <p>You requested to reset your password. Click the link below to proceed:</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 12px;">TELOS MAED - Christian Magazine Platform</p>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error }
  }
}

// Send welcome email
export async function sendWelcomeEmail(email: string, name: string) {
  const template = welcomeEmailTemplate(name)
  
  const mailOptions = {
    from: process.env.SMTP_FROM || 'noreply@telosmaed.com',
    to: email,
    subject: template.subject,
    html: template.html,
    text: template.text,
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error('Error sending welcome email:', error)
    return { success: false, error }
  }
}

// Send new article notification
export async function sendNewArticleNotification(
  email: string,
  userName: string,
  articleTitle: string,
  articleExcerpt: string,
  articleSlug: string,
  authorName: string
) {
  const template = newArticleNotificationTemplate(
    userName,
    articleTitle,
    articleExcerpt,
    articleSlug,
    authorName
  )
  
  const mailOptions = {
    from: process.env.SMTP_FROM || 'noreply@telosmaed.com',
    to: email,
    subject: template.subject,
    html: template.html,
    text: template.text,
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error('Error sending article notification:', error)
    return { success: false, error }
  }
}

// Send weekly digest
export async function sendWeeklyDigest(
  email: string,
  userName: string,
  articles: Array<{ title: string; excerpt: string; slug: string; author: string }>
) {
  const template = weeklyDigestTemplate(userName, articles)
  
  const mailOptions = {
    from: process.env.SMTP_FROM || 'noreply@telosmaed.com',
    to: email,
    subject: template.subject,
    html: template.html,
    text: template.text,
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error('Error sending weekly digest:', error)
    return { success: false, error }
  }
}

// Bulk send new article notifications to all subscribers
export async function notifySubscribersOfNewArticle(
  articleTitle: string,
  articleExcerpt: string,
  articleSlug: string,
  authorName: string
) {
  try {
    const { db } = await import('./db')
    
    // Get all active newsletter subscribers
    const subscribers = await db.newsletterSubscription.findMany({
      where: { active: true },
      select: { email: true, name: true }
    })

    const results = await Promise.allSettled(
      subscribers.map(subscriber =>
        sendNewArticleNotification(
          subscriber.email,
          subscriber.name || 'Reader',
          articleTitle,
          articleExcerpt,
          articleSlug,
          authorName
        )
      )
    )

    const successful = results.filter(r => r.status === 'fulfilled').length
    const failed = results.filter(r => r.status === 'rejected').length

    return {
      success: true,
      sent: successful,
      failed,
      total: subscribers.length
    }
  } catch (error) {
    console.error('Error notifying subscribers:', error)
    return { success: false, error }
  }
} 