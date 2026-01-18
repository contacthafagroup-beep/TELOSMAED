-- Additional tables that might be needed

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
    id TEXT PRIMARY KEY,
    content TEXT NOT NULL,
    approved BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW(),
    "authorId" TEXT NOT NULL,
    "articleId" TEXT,
    "poemId" TEXT,
    "parentId" TEXT
);

-- Likes table
CREATE TABLE IF NOT EXISTS likes (
    id TEXT PRIMARY KEY,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "userId" TEXT NOT NULL,
    "articleId" TEXT,
    "poemId" TEXT
);

-- Bookmarks table
CREATE TABLE IF NOT EXISTS bookmarks (
    id TEXT PRIMARY KEY,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "userId" TEXT NOT NULL,
    "articleId" TEXT,
    "poemId" TEXT
);

-- Settings table
CREATE TABLE IF NOT EXISTS settings (
    id TEXT PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    value TEXT NOT NULL,
    type TEXT DEFAULT 'STRING'
);

-- Newsletter subscriptions table
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    active BOOLEAN DEFAULT true,
    preferences TEXT,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW(),
    "userId" TEXT
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'GENERAL',
    status TEXT DEFAULT 'NEW',
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Analytics table
CREATE TABLE IF NOT EXISTS analytics (
    id TEXT PRIMARY KEY,
    path TEXT NOT NULL,
    views INTEGER DEFAULT 1,
    date TIMESTAMP DEFAULT NOW(),
    "userAgent" TEXT,
    country TEXT,
    referrer TEXT
);

-- Submissions table
CREATE TABLE IF NOT EXISTS submissions (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    type TEXT NOT NULL,
    category TEXT,
    status TEXT DEFAULT 'PENDING',
    feedback TEXT,
    "submittedAt" TIMESTAMP DEFAULT NOW(),
    "reviewedAt" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW(),
    "authorId" TEXT NOT NULL
);

-- Editorial categories table
CREATE TABLE IF NOT EXISTS editorial_categories (
    id SERIAL PRIMARY KEY,
    icon TEXT NOT NULL,
    "nameAm" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    color TEXT NOT NULL,
    "bgColor" TEXT NOT NULL,
    "descriptionAm" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "featuresAm" TEXT NOT NULL,
    "featuresEn" TEXT NOT NULL,
    articles INTEGER DEFAULT 0,
    readers TEXT DEFAULT '0',
    rating TEXT DEFAULT '0',
    "order" INTEGER DEFAULT 0,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);