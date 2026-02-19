# Email Notification System Setup Guide

TELOS MAED now has an automated email notification system that sends:
1. Welcome emails to new users
2. New article notifications to subscribers
3. Weekly digest emails

## SMTP Configuration

### Option 1: Gmail (Recommended for Testing)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Create an App Password:**
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
3. **Add to Vercel Environment Variables:**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   SMTP_FROM=TELOS MAED <your-email@gmail.com>
   ```

### Option 2: SendGrid (Recommended for Production)

1. **Sign up at** [SendGrid](https://sendgrid.com/)
2. **Create an API Key:**
   - Settings → API Keys → Create API Key
   - Give it "Full Access" permissions
3. **Add to Vercel Environment Variables:**
   ```env
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_USER=apikey
   SMTP_PASS=your-sendgrid-api-key
   SMTP_FROM=TELOS MAED <noreply@telosmaed.com>
   ```

### Option 3: AWS SES (Best for Scale)

1. **Set up AWS SES:**
   - Go to AWS SES Console
   - Verify your domain or email
   - Create SMTP credentials
2. **Add to Vercel Environment Variables:**
   ```env
   SMTP_HOST=email-smtp.us-east-1.amazonaws.com
   SMTP_PORT=587
   SMTP_USER=your-ses-smtp-username
   SMTP_PASS=your-ses-smtp-password
   SMTP_FROM=TELOS MAED <noreply@telosmaed.com>
   ```

## Vercel Configuration

### 1. Add Environment Variables

Go to your Vercel project → Settings → Environment Variables and add:

```env
# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=TELOS MAED <your-email@gmail.com>

# Site URL
SITE_URL=https://telosmaed.vercel.app

# Cron Secret (generate with: openssl rand -base64 32)
CRON_SECRET=your-random-secret-key
```

### 2. Enable Cron Jobs

The weekly digest is configured in `vercel.json` to run every Monday at 9 AM UTC:

```json
{
  "crons": [
    {
      "path": "/api/cron/weekly-digest",
      "schedule": "0 9 * * 1"
    }
  ]
}
```

Vercel will automatically set up this cron job on deployment.

## Email Features

### 1. Welcome Email

Automatically sent when a user registers:
- Beautiful branded template
- Links to explore the site
- Unsubscribe option

**Triggered by:** User registration at `/api/auth/register`

### 2. New Article Notifications

Send to all newsletter subscribers when a new article is published:

**Manual Trigger:**
```bash
POST /api/articles/notify
{
  "articleId": "article-id-here"
}
```

**Requirements:**
- Must be authenticated as ADMIN or EDITOR
- Article must be published

**Response:**
```json
{
  "success": true,
  "sent": 150,
  "failed": 2,
  "total": 152
}
```

### 3. Weekly Digest

Automatically sent every Monday at 9 AM UTC:
- Top 5 articles from the past week
- Sent to all active newsletter subscribers
- Beautiful responsive template

**Manual Test:**
```bash
GET /api/cron/weekly-digest
Authorization: Bearer your-cron-secret
```

## Testing Emails Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up local environment variables** in `.env.local`:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   SMTP_FROM=TELOS MAED <your-email@gmail.com>
   SITE_URL=http://localhost:3000
   ```

3. **Test welcome email:**
   - Register a new user
   - Check your email inbox

4. **Test article notification:**
   ```bash
   curl -X POST http://localhost:3000/api/articles/notify \
     -H "Content-Type: application/json" \
     -H "Cookie: auth_token=your-token" \
     -d '{"articleId":"article-id"}'
   ```

5. **Test weekly digest:**
   ```bash
   curl http://localhost:3000/api/cron/weekly-digest \
     -H "Authorization: Bearer your-cron-secret"
   ```

## Email Templates

All email templates are in `lib/email-templates.ts`:

- `welcomeEmailTemplate` - Welcome email for new users
- `newArticleNotificationTemplate` - New article notification
- `weeklyDigestTemplate` - Weekly digest email

Templates include:
- Responsive HTML design
- Plain text fallback
- Branded TELOS MAED styling
- Unsubscribe links

## Troubleshooting

### Emails not sending

1. **Check SMTP credentials:**
   - Verify environment variables are set correctly
   - Test SMTP connection with a simple script

2. **Check spam folder:**
   - Emails might be marked as spam initially
   - Add your domain to SPF/DKIM records

3. **Check logs:**
   - View Vercel function logs for errors
   - Look for "Error sending email" messages

### Gmail "Less secure app" error

- Use App Passwords instead of your regular password
- Enable 2-Factor Authentication first

### SendGrid emails not delivering

- Verify your sender email/domain
- Check SendGrid activity logs
- Ensure you're not in sandbox mode

## Best Practices

1. **Use a dedicated email service** (SendGrid, AWS SES) for production
2. **Set up SPF and DKIM records** for your domain
3. **Monitor email delivery rates** in your email service dashboard
4. **Respect unsubscribe requests** immediately
5. **Keep email content relevant** and valuable
6. **Test emails** before sending to all subscribers

## Monitoring

Track email performance:
- Open rates
- Click-through rates
- Bounce rates
- Unsubscribe rates

Most email services provide analytics dashboards.

## Future Enhancements

Potential additions:
- Email preferences (daily vs weekly)
- Category-specific notifications
- Personalized content recommendations
- A/B testing for subject lines
- Email analytics dashboard in admin panel
