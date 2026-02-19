# TELOS MAED Authentication System Setup Guide

## Overview
Complete authentication system with:
- User Registration
- Email Verification
- Login/Logout
- Welcome Email
- Password Reset
- Notification Emails

## Step 1: Install Required Packages

```bash
npm install nodemailer bcryptjs jsonwebtoken
npm install --save-dev @types/nodemailer @types/bcryptjs @types/jsonwebtoken
```

## Step 2: Environment Variables

Add these to your `.env` file:

```env
# Email Configuration (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=telosmaed@gmail.com
SMTP_PASS=your-app-specific-password
SMTP_FROM=noreply@telosmaed.com

# JWT Secret for tokens
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Site URL
NEXT_PUBLIC_SITE_URL=https://telosmaed.vercel.app
```

### Gmail App Password Setup:
1. Go to Google Account Settings
2. Security → 2-Step Verification (enable it)
3. App Passwords → Generate new app password
4. Use this password in SMTP_PASS

## Step 3: Database Schema Updates

Your Prisma schema already has the User model. We need to add verification fields:

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String?  // For email/password auth
  name      String?
  role      String   @default("READER")
  verified  Boolean  @default(false)
  verificationToken String?
  resetToken String?
  resetTokenExpiry DateTime?
  // ... rest of fields
}
```

Run migration:
```bash
npx prisma migrate dev --name add_auth_fields
```

## Step 4: File Structure

The implementation creates these files:

```
lib/
  ├── email.ts              # Email sending utility
  ├── email-templates.ts    # HTML email templates
  └── password.ts           # Password hashing utilities

app/api/
  ├── auth/
  │   ├── register/route.ts       # User registration
  │   ├── login/route.ts          # User login
  │   ├── verify/route.ts         # Email verification
  │   ├── forgot-password/route.ts # Password reset request
  │   └── reset-password/route.ts  # Password reset
  └── users/
      └── profile/route.ts        # User profile

components/
  └── auth/
      ├── register-form.tsx       # Registration form
      ├── login-form.tsx          # Login form
      └── reset-password-form.tsx # Password reset form
```

## Step 5: Features Included

### Registration Flow:
1. User fills registration form
2. System creates account (unverified)
3. Sends verification email with token
4. User clicks link to verify
5. Sends welcome email
6. User can now login

### Login Flow:
1. User enters email/password
2. System validates credentials
3. Checks if email is verified
4. Returns JWT token
5. Stores token in cookies/localStorage

### Password Reset Flow:
1. User requests password reset
2. System sends reset email with token
3. User clicks link and enters new password
4. System updates password
5. Sends confirmation email

### Email Types:
1. **Verification Email** - Sent on registration
2. **Welcome Email** - Sent after verification
3. **Password Reset Email** - Sent on reset request
4. **Password Changed Email** - Sent after successful reset
5. **Login Notification** - Optional security notification

## Step 6: Security Features

- Passwords hashed with bcrypt (10 rounds)
- JWT tokens for authentication
- Email verification required
- Password reset tokens expire in 1 hour
- Rate limiting on auth endpoints
- HTTPS only cookies
- XSS protection

## Step 7: Testing

### Test Registration:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!","name":"Test User"}'
```

### Test Login:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}'
```

## Step 8: Frontend Integration

### Registration Page:
- Create `/app/register/page.tsx`
- Use RegisterForm component
- Handle success/error states
- Redirect to verification message

### Login Page:
- Create `/app/login/page.tsx`
- Use LoginForm component
- Store JWT token
- Redirect to dashboard/home

### Protected Routes:
- Check JWT token in middleware
- Redirect to login if not authenticated
- Show user info in header

## Step 9: Email Templates

All emails include:
- TELOS MAED branding
- Responsive design
- Clear call-to-action buttons
- Amharic translations
- Footer with contact info

## Step 10: Deployment Checklist

- [ ] Set all environment variables in Vercel
- [ ] Configure Gmail app password
- [ ] Update NEXT_PUBLIC_SITE_URL
- [ ] Run database migrations
- [ ] Test email delivery
- [ ] Test registration flow
- [ ] Test login flow
- [ ] Test password reset
- [ ] Enable HTTPS only cookies

## Troubleshooting

### Emails not sending:
- Check SMTP credentials
- Verify Gmail app password
- Check spam folder
- Enable "Less secure app access" (if needed)

### Verification links not working:
- Check NEXT_PUBLIC_SITE_URL is correct
- Verify token generation
- Check token expiry

### Login issues:
- Verify email is confirmed
- Check password is correct
- Clear cookies/localStorage
- Check JWT_SECRET is set

## Next Steps

After basic auth is working:
1. Add OAuth (Google, Facebook)
2. Add 2FA (Two-Factor Authentication)
3. Add session management
4. Add user profile editing
5. Add email preferences
6. Add notification settings
