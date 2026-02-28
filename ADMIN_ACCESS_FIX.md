# Admin Access Fix - Complete Guide

## Problem Summary
The admin page was redirecting to `/login` even after logging in because:
1. Role check was case-sensitive (`'ADMIN'` vs `'admin'`)
2. Cookie settings might have been incompatible
3. No unified authentication between main site and admin area

## Changes Made

### 1. Fixed Admin Layout (`app/admin/layout.tsx`)
- Changed role check from `payload.role !== 'ADMIN'` to `payload.role.toUpperCase() !== 'ADMIN'`
- Added error logging for better debugging
- Now accepts both uppercase and lowercase role values

### 2. Fixed Login Cookie Settings (`app/api/auth/login/route.ts`)
- Changed `sameSite: 'none'` to `sameSite: 'lax'` for better compatibility
- Changed `secure: true` to `secure: process.env.NODE_ENV === 'production'`
- This ensures cookies work properly in both development and production

### 3. Updated Header Navigation (`components/layout/header.tsx`)
- Admin link now shows for users with role `'ADMIN'` (case-insensitive)
- Automatically updates when user logs in/out
- No separate login needed for admin area

### 4. Added Debug Endpoint (`app/api/auth/debug/route.ts`)
- Visit `/api/auth/debug` to check your authentication status
- Shows decoded token, role, and whether you're recognized as admin

## How to Test

### Step 1: Check Your Database
Make sure your user in Supabase has `role = 'ADMIN'` (uppercase):
```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'your-email@example.com';
```

### Step 2: Clear Browser Data
1. Open DevTools (F12)
2. Go to Application tab
3. Clear all cookies for your domain
4. Clear localStorage
5. Refresh the page

### Step 3: Login Again
1. Go to `/login`
2. Login with your admin email and password
3. After successful login, you should see:
   - "Admin" link in the navigation bar
   - Ability to access `/admin` without redirect

### Step 4: Debug If Still Not Working
1. Visit `/api/auth/debug` to see your authentication status
2. Check the response:
   - `authenticated: true` - You're logged in
   - `role: "ADMIN"` - Your role is correct
   - `isAdmin: true` - You should have admin access

## Common Issues & Solutions

### Issue 1: Still Redirecting to Login
**Solution:** 
- Clear all cookies and localStorage
- Make sure your user role in database is `'ADMIN'` (uppercase)
- Check `/api/auth/debug` to verify token

### Issue 2: Admin Link Not Showing
**Solution:**
- Check localStorage for `user` key
- Verify the stored user object has `role: 'ADMIN'`
- Refresh the page after login

### Issue 3: Cookie Not Being Set
**Solution:**
- Check browser console for cookie errors
- Verify you're using HTTPS in production
- Check that cookies are enabled in browser

## Database Role Values
According to your Prisma schema, valid roles are:
- `READER` (default)
- `CONTRIBUTOR`
- `EDITOR`
- `ADMIN`

Make sure your admin user has exactly `'ADMIN'` (uppercase) in the database.

## Testing Checklist
- [ ] User has `role = 'ADMIN'` in database
- [ ] Can login successfully at `/login`
- [ ] "Admin" link appears in navigation after login
- [ ] Can access `/admin` without redirect
- [ ] `/api/auth/debug` shows `isAdmin: true`
- [ ] Admin link disappears after logout

## Next Steps
1. Push these changes to GitHub
2. Deploy to Vercel
3. Clear browser cache on production
4. Test login with admin account
5. Verify admin access works

## Support
If you still have issues:
1. Check `/api/auth/debug` response
2. Check browser console for errors
3. Verify database role is uppercase `'ADMIN'`
4. Make sure cookies are enabled
