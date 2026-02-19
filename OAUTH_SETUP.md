# OAuth Setup Guide for TELOS MAED

This guide will help you set up Google and Facebook OAuth authentication.

## Google OAuth Setup

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API

### 2. Create OAuth Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth client ID**
3. Select **Web application**
4. Add authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://yourdomain.com/api/auth/callback/google`
5. Copy the **Client ID** and **Client Secret**

### 3. Add to Environment Variables

```env
GOOGLE_CLIENT_ID=your-client-id-here
GOOGLE_CLIENT_SECRET=your-client-secret-here
```

## Facebook OAuth Setup

### 1. Create a Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click **My Apps** → **Create App**
3. Select **Consumer** as the app type
4. Fill in app details

### 2. Configure Facebook Login

1. In your app dashboard, go to **Products** → **Facebook Login** → **Settings**
2. Add Valid OAuth Redirect URIs:
   - Development: `http://localhost:3000/api/auth/callback/facebook`
   - Production: `https://yourdomain.com/api/auth/callback/facebook`
3. Save changes

### 3. Get App Credentials

1. Go to **Settings** → **Basic**
2. Copy the **App ID** and **App Secret**

### 4. Add to Environment Variables

```env
FACEBOOK_CLIENT_ID=your-app-id-here
FACEBOOK_CLIENT_SECRET=your-app-secret-here
```

## Vercel Deployment

Add these environment variables in your Vercel project settings:

1. Go to your project on Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Add all the OAuth variables:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `FACEBOOK_CLIENT_ID`
   - `FACEBOOK_CLIENT_SECRET`
   - `NEXTAUTH_URL` (your production URL)
   - `NEXTAUTH_SECRET` (generate with: `openssl rand -base64 32`)

## Testing

1. Start your development server: `npm run dev`
2. Go to `/login` or `/register`
3. Click on "Continue with Google" or "Continue with Facebook"
4. Complete the OAuth flow
5. You should be redirected back and logged in

## Troubleshooting

### "Redirect URI mismatch" error
- Make sure the redirect URI in your OAuth provider matches exactly
- Check for trailing slashes
- Verify the protocol (http vs https)

### "Invalid client" error
- Double-check your Client ID and Client Secret
- Make sure they're correctly set in your environment variables
- Restart your development server after changing env variables

### Users not being created
- Check your database connection
- Verify the Prisma schema includes all required fields
- Check server logs for errors
