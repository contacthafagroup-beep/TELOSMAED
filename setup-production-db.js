const { execSync } = require('child_process');

console.log('🚀 Setting up production database...');

try {
  // Set the DATABASE_URL for this script
  process.env.DATABASE_URL = 'postgres://postgres.bcahuxfmmuxhhudwpmyj:gFmf5DVQwvT7YqtX@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true';
  
  console.log('📦 Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  console.log('🔄 Pushing database schema...');
  execSync('npx prisma db push', { stdio: 'inherit' });
  
  console.log('🌱 Seeding database...');
  execSync('npx tsx prisma/seed.ts', { stdio: 'inherit' });
  
  console.log('🎯 Seeding hero data...');
  execSync('npx tsx prisma/seed-hero.ts', { stdio: 'inherit' });
  
  console.log('✅ Production database setup complete!');
  
} catch (error) {
  console.error('❌ Error setting up database:', error.message);
  process.exit(1);
}