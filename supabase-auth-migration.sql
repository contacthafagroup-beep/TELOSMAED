-- Add authentication fields to users table

-- Add password field (required for authentication)
ALTER TABLE users ADD COLUMN IF NOT EXISTS password TEXT;

-- Add password reset fields
ALTER TABLE users ADD COLUMN IF NOT EXISTS "resetToken" TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS "resetTokenExpiry" TIMESTAMP;

-- Add email verification field
ALTER TABLE users ADD COLUMN IF NOT EXISTS "verificationToken" TEXT;

-- Create index on resetToken for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_reset_token ON users("resetToken");

-- Create index on verificationToken for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_verification_token ON users("verificationToken");

-- Create index on email for faster authentication lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Update existing users to have a default password (you should change these manually)
-- This is just for migration purposes
UPDATE users SET password = '$2a$10$defaulthashedpassword' WHERE password IS NULL;

-- Make password NOT NULL after setting defaults
ALTER TABLE users ALTER COLUMN password SET NOT NULL;

COMMENT ON COLUMN users.password IS 'Bcrypt hashed password';
COMMENT ON COLUMN users."resetToken" IS 'Token for password reset';
COMMENT ON COLUMN users."resetTokenExpiry" IS 'Expiry time for reset token';
COMMENT ON COLUMN users."verificationToken" IS 'Token for email verification';
