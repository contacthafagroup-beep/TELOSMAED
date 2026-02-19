# TELOS MAED Authentication System

## Overview
Complete authentication system with JWT tokens, password hashing, role-based access control, and password reset functionality.

## Features

### ✅ User Registration
- Email validation
- Password strength requirements (minimum 8 characters)
- Automatic password hashing with bcrypt
- Default role assignment (READER)

### ✅ User Login
- Email/password authentication
- JWT token generation
- HttpOnly cookie for security
- 7-day token expiration

### ✅ Password Reset
- Forgot password flow
- Secure reset tokens
- 1-hour token expiration
- Email notification (ready for integration)

### ✅ Role-Based Access Control
- READER: Basic access
- CONTRIBUTOR: Can submit content
- EDITOR: Can manage content
- ADMIN: Full access

### ✅ Security Features
- Bcrypt password hashing (10 rounds)
- JWT tokens with expiration
- HttpOnly cookies
- CSRF protection
- Token verification middleware

## API Endpoints

### POST /api/auth/register
Register a new user
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "name": "John Doe"
}
```

### POST /api/auth/login
Login with credentials
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

### POST /api/auth/logout
Logout current user (clears auth cookie)

### GET /api/auth/me
Get current authenticated user

### POST /api/auth/forgot-password
Request password reset
```json
{
  "email": "user@example.com"
}
```

### POST /api/auth/reset-password
Reset password with token
```json
{
  "token": "reset-token-here",
  "password": "newsecurepassword123"
}
```

## Database Migration

Run this SQL on your Supabase database:

```bash
# Execute the migration file
psql $DATABASE_URL < supabase-auth-migration.sql
```

Or manually run the SQL commands in Supabase SQL Editor.

## Usage in Components

### Using the Auth Hook

```typescript
import { useAuth } from '@/lib/hooks/use-auth'

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth()

  const handleLogin = async () => {
    const result = await login('user@example.com', 'password')
    if (result.success) {
      console.log('Logged in!', result.user)
    } else {
      console.error('Login failed:', result.error)
    }
  }

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.name}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  )
}
```

### Using the Auth Context

```typescript
import { useAuthContext } from '@/components/providers/auth-provider'

function MyComponent() {
  const { user, isAdmin } = useAuthContext()

  if (isAdmin) {
    return <AdminPanel />
  }

  return <UserPanel />
}
```

### Protecting API Routes

```typescript
import { requireAuth, requireAdmin } from '@/lib/auth-middleware'

export async function GET(request: NextRequest) {
  return requireAuth(request, async (req, user) => {
    // User is authenticated
    return NextResponse.json({ message: 'Protected data', user })
  })
}

export async function POST(request: NextRequest) {
  return requireAdmin(request, async (req, user) => {
    // User is admin or editor
    return NextResponse.json({ message: 'Admin action completed' })
  })
}
```

## Environment Variables

Add to your `.env` file:

```env
# Authentication
NEXTAUTH_SECRET="your-super-secret-jwt-key-change-this-in-production"
NEXTAUTH_URL="https://telosmaed.vercel.app"

# Site Configuration
SITE_URL="https://telosmaed.vercel.app"
SITE_NAME="TELOS MAED"

# Database
DATABASE_URL="postgresql://..."
```

## Setup Steps

1. **Run Database Migration**
   ```bash
   # Apply the auth migration to Supabase
   psql $DATABASE_URL < supabase-auth-migration.sql
   ```

2. **Update Environment Variables**
   - Add `NEXTAUTH_SECRET` to Vercel
   - Ensure `DATABASE_URL` is configured

3. **Wrap App with Auth Provider** (Optional for global auth state)
   ```typescript
   // app/layout.tsx
   import { AuthProvider } from '@/components/providers/auth-provider'

   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           <AuthProvider>
             {children}
           </AuthProvider>
         </body>
       </html>
     )
   }
   ```

4. **Deploy to Vercel**
   ```bash
   git add .
   git commit -m "Add complete authentication system"
   git push
   ```

## Testing

### Test Registration
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'
```

### Test Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}' \
  -c cookies.txt
```

### Test Protected Route
```bash
curl http://localhost:3000/api/auth/me \
  -b cookies.txt
```

## Security Best Practices

1. ✅ Passwords are hashed with bcrypt (10 rounds)
2. ✅ JWT tokens stored in httpOnly cookies
3. ✅ Tokens expire after 7 days
4. ✅ Password reset tokens expire after 1 hour
5. ✅ Email enumeration prevention
6. ✅ Role-based access control
7. ✅ Active user verification

## Next Steps

- [ ] Integrate email service for password reset
- [ ] Add email verification flow
- [ ] Implement 2FA (optional)
- [ ] Add OAuth providers (Google, Facebook)
- [ ] Add rate limiting for auth endpoints
- [ ] Add account lockout after failed attempts

## Support

For issues or questions, contact: telosmaed@gmail.com
