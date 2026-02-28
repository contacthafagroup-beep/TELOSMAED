# Admin Link Troubleshooting Guide

## Issue
Admin button appears in navigation but doesn't navigate to `/admin` when clicked.

## Changes Made
1. Fixed admin page role check to be case-insensitive
2. Added debug logging to see navigation state

## How to Debug

### Step 1: Check Browser Console
1. Open your browser DevTools (F12)
2. Go to the Console tab
3. Look for these logs after logging in:
   ```
   User role: ADMIN Is Admin: true
   Navigation items: [{name: "Home", href: "/"}, {name: "Content", href: "/articles"}, ...]
   ```
4. Verify the Admin link appears in the navigation items array

### Step 2: Check the Link Element
1. Right-click on the "Admin" button in the navigation
2. Select "Inspect Element"
3. Verify the HTML looks like:
   ```html
   <a href="/admin" class="...">
     <span>Admin</span>
   </a>
   ```
4. Make sure `href="/admin"` is present

### Step 3: Test Direct Navigation
1. Try typing `/admin` directly in the browser address bar
2. If this works but clicking doesn't, there's a JavaScript issue
3. If this also redirects, check your authentication

### Step 4: Check Authentication
1. Visit `/api/auth/debug` in your browser
2. Verify the response shows:
   ```json
   {
     "authenticated": true,
     "decoded": {
       "role": "ADMIN",
       "isAdmin": true
     }
   }
   ```

### Step 5: Clear Everything and Re-login
1. Open DevTools (F12)
2. Go to Application tab
3. Clear all:
   - Cookies (especially `auth_token`)
   - Local Storage (especially `user` key)
   - Session Storage
4. Close and reopen the browser
5. Login again
6. Try clicking the Admin link

## Common Issues

### Issue 1: Link appears but has no href
**Symptom:** Admin button shows but clicking does nothing
**Solution:** Check console for navigation array, verify href is present

### Issue 2: Link redirects back to login
**Symptom:** Clicking Admin takes you to `/login`
**Solution:** 
- Check `/api/auth/debug` to verify authentication
- Make sure your database role is `'ADMIN'` (uppercase)
- Clear cookies and re-login

### Issue 3: Link works in dev but not production
**Symptom:** Works locally but not on Vercel
**Solution:**
- Check Vercel deployment logs
- Verify environment variables are set
- Check that cookies are being set with correct domain

### Issue 4: JavaScript error in console
**Symptom:** Error when clicking the link
**Solution:**
- Check console for specific error
- Verify Next.js Link component is working
- Try hard refresh (Ctrl+Shift+R)

## Testing Checklist
- [ ] Browser console shows correct user role
- [ ] Navigation array includes Admin link with href="/admin"
- [ ] Inspect element shows `<a href="/admin">`
- [ ] `/api/auth/debug` shows `isAdmin: true`
- [ ] Direct navigation to `/admin` works
- [ ] Clicking Admin link navigates to `/admin`
- [ ] Admin dashboard page loads correctly

## If Still Not Working

1. **Check the exact behavior:**
   - Does clicking do nothing at all?
   - Does it navigate but then redirect?
   - Is there a JavaScript error?

2. **Share console output:**
   - Any errors in console?
   - What does the navigation array show?
   - What does `/api/auth/debug` return?

3. **Try incognito mode:**
   - Sometimes cached data causes issues
   - Test in a fresh incognito window

4. **Check network tab:**
   - Open DevTools Network tab
   - Click the Admin link
   - See if any requests are made
   - Check for failed requests or redirects
