// Email templates for TELOS MAED

export const welcomeEmailTemplate = (name: string) => ({
  subject: 'Welcome to TELOS MAED - Your Journey Begins',
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to TELOS MAED</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #203685 0%, #1a2a5e 100%); padding: 40px 30px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: bold;">TELOS MAED</h1>
                  <p style="color: #e0e0e0; margin: 10px 0 0 0; font-size: 14px; letter-spacing: 2px;">CHRISTIAN MAGAZINE</p>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  <h2 style="color: #203685; margin: 0 0 20px 0; font-size: 24px;">Welcome, ${name}!</h2>
                  
                  <p style="color: #333333; line-height: 1.6; margin: 0 0 15px 0;">
                    We're thrilled to have you join the TELOS MAED community! You've taken the first step on a journey of faith, growth, and inspiration.
                  </p>
                  
                  <p style="color: #333333; line-height: 1.6; margin: 0 0 15px 0;">
                    As a member, you'll have access to:
                  </p>
                  
                  <ul style="color: #333333; line-height: 1.8; margin: 0 0 20px 0; padding-left: 20px;">
                    <li>Inspiring articles on faith, leadership, and personal growth</li>
                    <li>Thought-provoking poetry and creative worship content</li>
                    <li>Exclusive insights from our editorial team</li>
                    <li>A vibrant community of like-minded believers</li>
                  </ul>
                  
                  <div style="text-align: center; margin: 30px 0;">
                    <a href="${process.env.SITE_URL || 'https://telosmaed.vercel.app'}" 
                       style="display: inline-block; background-color: #203685; color: #ffffff; text-decoration: none; padding: 14px 30px; border-radius: 6px; font-weight: bold; font-size: 16px;">
                      Explore TELOS MAED
                    </a>
                  </div>
                  
                  <p style="color: #333333; line-height: 1.6; margin: 20px 0 0 0;">
                    May your time with us be filled with wisdom, encouragement, and spiritual growth.
                  </p>
                  
                  <p style="color: #333333; line-height: 1.6; margin: 15px 0 0 0;">
                    Blessings,<br>
                    <strong>The TELOS MAED Team</strong>
                  </p>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
                  <p style="color: #666666; font-size: 12px; margin: 0 0 10px 0;">
                    You're receiving this email because you signed up for TELOS MAED.
                  </p>
                  <p style="color: #666666; font-size: 12px; margin: 0;">
                    <a href="${process.env.SITE_URL}/unsubscribe" style="color: #203685; text-decoration: none;">Unsubscribe</a> | 
                    <a href="${process.env.SITE_URL}/contact" style="color: #203685; text-decoration: none;">Contact Us</a>
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `,
  text: `
Welcome to TELOS MAED, ${name}!

We're thrilled to have you join our community! You've taken the first step on a journey of faith, growth, and inspiration.

As a member, you'll have access to:
- Inspiring articles on faith, leadership, and personal growth
- Thought-provoking poetry and creative worship content
- Exclusive insights from our editorial team
- A vibrant community of like-minded believers

Visit us at: ${process.env.SITE_URL || 'https://telosmaed.vercel.app'}

May your time with us be filled with wisdom, encouragement, and spiritual growth.

Blessings,
The TELOS MAED Team
  `
})

export const newArticleNotificationTemplate = (
  userName: string,
  articleTitle: string,
  articleExcerpt: string,
  articleSlug: string,
  authorName: string
) => ({
  subject: `New Article: ${articleTitle}`,
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Article Published</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #203685 0%, #1a2a5e 100%); padding: 30px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">TELOS MAED</h1>
                  <p style="color: #e0e0e0; margin: 10px 0 0 0; font-size: 12px; letter-spacing: 2px;">NEW ARTICLE PUBLISHED</p>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  <p style="color: #666666; margin: 0 0 20px 0; font-size: 14px;">Hello ${userName},</p>
                  
                  <h2 style="color: #203685; margin: 0 0 15px 0; font-size: 24px; line-height: 1.3;">
                    ${articleTitle}
                  </h2>
                  
                  <p style="color: #999999; margin: 0 0 20px 0; font-size: 14px;">
                    By ${authorName}
                  </p>
                  
                  <p style="color: #333333; line-height: 1.6; margin: 0 0 25px 0; font-size: 16px;">
                    ${articleExcerpt}
                  </p>
                  
                  <div style="text-align: center; margin: 30px 0;">
                    <a href="${process.env.SITE_URL}/articles/${articleSlug}" 
                       style="display: inline-block; background-color: #203685; color: #ffffff; text-decoration: none; padding: 14px 30px; border-radius: 6px; font-weight: bold; font-size: 16px;">
                      Read Full Article
                    </a>
                  </div>
                  
                  <p style="color: #666666; line-height: 1.6; margin: 25px 0 0 0; font-size: 14px; text-align: center;">
                    We hope this article inspires and encourages you in your faith journey.
                  </p>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
                  <p style="color: #666666; font-size: 12px; margin: 0 0 10px 0;">
                    You're receiving this because you subscribed to TELOS MAED notifications.
                  </p>
                  <p style="color: #666666; font-size: 12px; margin: 0;">
                    <a href="${process.env.SITE_URL}/profile/notifications" style="color: #203685; text-decoration: none;">Manage Preferences</a> | 
                    <a href="${process.env.SITE_URL}/unsubscribe" style="color: #203685; text-decoration: none;">Unsubscribe</a>
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `,
  text: `
Hello ${userName},

New Article Published: ${articleTitle}
By ${authorName}

${articleExcerpt}

Read the full article at: ${process.env.SITE_URL}/articles/${articleSlug}

We hope this article inspires and encourages you in your faith journey.

---
You're receiving this because you subscribed to TELOS MAED notifications.
Manage your preferences: ${process.env.SITE_URL}/profile/notifications
  `
})

export const weeklyDigestTemplate = (
  userName: string,
  articles: Array<{ title: string; excerpt: string; slug: string; author: string }>
) => ({
  subject: 'Your Weekly TELOS MAED Digest',
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Weekly Digest</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #203685 0%, #1a2a5e 100%); padding: 30px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">TELOS MAED</h1>
                  <p style="color: #e0e0e0; margin: 10px 0 0 0; font-size: 12px; letter-spacing: 2px;">WEEKLY DIGEST</p>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  <p style="color: #666666; margin: 0 0 20px 0; font-size: 14px;">Hello ${userName},</p>
                  
                  <p style="color: #333333; line-height: 1.6; margin: 0 0 25px 0;">
                    Here's what we published this week. We hope these articles inspire and encourage you!
                  </p>
                  
                  ${articles.map(article => `
                    <div style="margin-bottom: 30px; padding-bottom: 30px; border-bottom: 1px solid #e0e0e0;">
                      <h3 style="color: #203685; margin: 0 0 10px 0; font-size: 20px;">
                        <a href="${process.env.SITE_URL}/articles/${article.slug}" style="color: #203685; text-decoration: none;">
                          ${article.title}
                        </a>
                      </h3>
                      <p style="color: #999999; margin: 0 0 10px 0; font-size: 13px;">By ${article.author}</p>
                      <p style="color: #666666; line-height: 1.6; margin: 0; font-size: 14px;">${article.excerpt}</p>
                    </div>
                  `).join('')}
                  
                  <div style="text-align: center; margin: 30px 0 0 0;">
                    <a href="${process.env.SITE_URL}/articles" 
                       style="display: inline-block; background-color: #203685; color: #ffffff; text-decoration: none; padding: 14px 30px; border-radius: 6px; font-weight: bold; font-size: 16px;">
                      View All Articles
                    </a>
                  </div>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
                  <p style="color: #666666; font-size: 12px; margin: 0 0 10px 0;">
                    You're receiving this weekly digest from TELOS MAED.
                  </p>
                  <p style="color: #666666; font-size: 12px; margin: 0;">
                    <a href="${process.env.SITE_URL}/profile/notifications" style="color: #203685; text-decoration: none;">Manage Preferences</a> | 
                    <a href="${process.env.SITE_URL}/unsubscribe" style="color: #203685; text-decoration: none;">Unsubscribe</a>
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `,
  text: `
Hello ${userName},

Your Weekly TELOS MAED Digest

Here's what we published this week:

${articles.map(article => `
${article.title}
By ${article.author}
${article.excerpt}
Read more: ${process.env.SITE_URL}/articles/${article.slug}
`).join('\n---\n')}

View all articles: ${process.env.SITE_URL}/articles
  `
})
