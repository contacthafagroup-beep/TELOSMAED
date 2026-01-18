# Admin Authentication Setup

## Overview
The admin panel is now protected with authentication. Only users with valid credentials can access the admin dashboard.

## Default Credentials
- **Username:** `admin`
- **Password:** `telosmaed2024`

⚠️ **IMPORTANT:** Change these credentials before deploying to production!

## How to Change Credentials

### Method 1: Update the code directly
1. Open `lib/auth.ts`
2. Update the `ADMIN_CREDENTIALS` object:
```typescript
export const ADMIN_CREDENTIALS = {
  username: 'your_username',
  password: 'your_secure_password'
}
```

### Method 2: Use environment variables (recommended)
1. Copy `.env.admin.example` to `.env.local`
2. Update the credentials in `.env.local`
3. Modify `lib/auth.ts` to use environment variables

## Security Features

### ✅ What's Protected
- All admin routes (`/admin/*`)
- Admin dashboard access
- Article management
- Poetry management
- User management
- All admin API endpoints

### ✅ Security Measures
- Client-side authentication guard
- Token-based session management
- 24-hour session expiration
- Automatic logout on token expiry
- Password visibility toggle
- Secure credential validation

### ✅ User Experience
- Clean login form with modern UI
- Loading states and error handling
- Automatic redirect after login
- Easy logout functionality
- Session persistence across browser tabs

## How It Works

1. **Access Protection:** When users visit `/admin`, they're redirected to a login form
2. **Authentication:** Users enter username/password
3. **Token Generation:** Valid credentials generate a time-stamped token
4. **Session Management:** Token is stored in localStorage with 24-hour expiry
5. **Auto-Logout:** Expired tokens automatically log users out

## Files Added/Modified

### New Files:
- `lib/auth.ts` - Authentication utilities
- `components/admin/login-form.tsx` - Login form component
- `components/admin/auth-guard.tsx` - Authentication guard wrapper
- `app/api/auth/login/route.ts` - Login API endpoint
- `.env.admin.example` - Environment variables example

### Modified Files:
- `app/admin/layout.tsx` - Added AuthGuard wrapper
- `app/admin/page.tsx` - Added logout functionality

## Production Deployment

### Before deploying:
1. ✅ Change default credentials
2. ✅ Use environment variables for credentials
3. ✅ Enable HTTPS
4. ✅ Consider adding rate limiting
5. ✅ Set up proper backup procedures

### Optional Enhancements:
- Add password strength requirements
- Implement account lockout after failed attempts
- Add two-factor authentication (2FA)
- Use JWT tokens with server-side validation
- Add audit logging for admin actions

## Troubleshooting

### Can't access admin panel?
- Check if credentials are correct
- Clear browser localStorage
- Check browser console for errors

### Session expires too quickly?
- Modify token expiration in `lib/auth.ts`
- Current setting: 24 hours

### Forgot admin password?
- Update credentials in `lib/auth.ts`
- Or reset via environment variables

## Support
For any issues with the authentication system, check the browser console for error messages or contact the development team.