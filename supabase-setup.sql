-- Create all tables for TELOS MAED

-- Users table (create first, no dependencies)
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    role TEXT DEFAULT 'READER',
    bio TEXT,
    avatar TEXT,
    location TEXT,
    website TEXT,
    social TEXT,
    verified BOOLEAN DEFAULT false,
    active BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Issues table (create second, no dependencies)
CREATE TABLE IF NOT EXISTS issues (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    "titleAm" TEXT,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    "descriptionAm" TEXT,
    "coverImage" TEXT,
    theme TEXT,
    month INTEGER NOT NULL,
    year INTEGER NOT NULL,
    published BOOLEAN DEFAULT false,
    "publishedAt" TIMESTAMP,
    featured BOOLEAN DEFAULT false,
    "downloadUrl" TEXT,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW(),
    UNIQUE(month, year)
);

-- Articles table (create after users and issues)
CREATE TABLE IF NOT EXISTS articles (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    "titleAm" TEXT,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    "excerptAm" TEXT,
    content TEXT NOT NULL,
    "contentAm" TEXT,
    category TEXT NOT NULL,
    tags TEXT DEFAULT '',
    featured BOOLEAN DEFAULT false,
    published BOOLEAN DEFAULT false,
    "publishedAt" TIMESTAMP,
    "readTime" INTEGER,
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    shares INTEGER DEFAULT 0,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "coverImage" TEXT,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW(),
    "authorId" TEXT NOT NULL,
    "issueId" TEXT
);

-- Poems table (create after users and issues)
CREATE TABLE IF NOT EXISTS poems (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    "titleAm" TEXT,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    "contentAm" TEXT,
    type TEXT DEFAULT 'SPIRITUAL',
    featured BOOLEAN DEFAULT false,
    published BOOLEAN DEFAULT false,
    "publishedAt" TIMESTAMP,
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    shares INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW(),
    "authorId" TEXT NOT NULL,
    "issueId" TEXT
);

-- Hero Video table
CREATE TABLE IF NOT EXISTS "hero_videos" (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    "titleAm" TEXT NOT NULL,
    description TEXT NOT NULL,
    "descriptionAm" TEXT NOT NULL,
    "videoUrl" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Hero Categories table
CREATE TABLE IF NOT EXISTS "hero_categories" (
    id SERIAL PRIMARY KEY,
    "nameEn" TEXT NOT NULL,
    "nameAm" TEXT NOT NULL,
    "descEn" TEXT NOT NULL,
    "descAm" TEXT NOT NULL,
    icon TEXT NOT NULL,
    color TEXT NOT NULL,
    href TEXT NOT NULL,
    "amharicTitle" TEXT NOT NULL,
    "amharicDescription" TEXT NOT NULL,
    features TEXT NOT NULL,
    "isActive" BOOLEAN DEFAULT true,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Insert sample data
INSERT INTO users (id, email, name, role, bio, verified) VALUES 
('user1', 'editor@telosmaed.com', 'Samuel Tadesse', 'EDITOR', 'Chief Editor of TELOS MAED', true),
('user2', 'writer@telosmaed.com', 'Ruth Alemayehu', 'CONTRIBUTOR', 'Contributing Writer', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO articles (id, title, "titleAm", slug, excerpt, "excerptAm", content, "contentAm", category, tags, featured, published, "publishedAt", "readTime", views, likes, "authorId") VALUES 
('art1', 'The Art of Christian Leadership', 'የክርስቲያን አመራር ጥበብ', 'the-art-of-christian-leadership', 'Exploring servant leadership through biblical principles.', 'በመጽሐፍ ቅዱስ መርሆዎች የአገልጋይ አመራርን መመርመር።', 'Leadership in the Christian context is fundamentally different from worldly leadership. It is rooted in service, humility, and love. As Jesus demonstrated, true leadership comes from serving others and putting their needs before our own. This article explores the biblical foundations of Christian leadership and how we can apply these principles in our daily lives, whether in our families, churches, or workplaces.', 'በክርስቲያናዊ አውድ ውስጥ አመራር ከዓለማዊ አመራር በመሠረቱ የተለየ ነው። በአገልግሎት፣ በትህትና እና በፍቅር ላይ የተመሠረተ ነው። ኢየሱስ እንደሳሳተው፣ እውነተኛ አመራር ሌሎችን ከማገልገል እና ፍላጎታቸውን ከራሳችን በፊት ከማስቀመጥ ይመጣል።', 'LEADERSHIP', 'leadership,christian,servant', true, true, NOW(), 8, 245, 12, 'user1'),
('art2', 'Finding Peace in Turbulent Times', 'በተወዛጋቢ ጊዜዎች ሰላም ማግኘት', 'finding-peace-in-turbulent-times', 'How faith anchors us during life''s storms.', 'እምነት በሕይወት አውሎ ነፋሶች ወቅት እንዴት እንደሚያጽናናን።', 'In times of uncertainty and chaos, our faith becomes our anchor. This article explores how we can find peace through prayer, meditation on God''s word, and trusting in His sovereignty even when circumstances seem overwhelming.', 'በእርግጠኛ ባልሆነ እና በትርምስ ጊዜ፣ እምነታችን መልህቃችን ይሆናል። ይህ ጽሑፍ በጸሎት፣ በእግዚአብሔር ቃል ላይ በማሰላሰል እና ሁኔታዎች አስደንጋጭ ሲመስሉ እንኳን በእርሱ ሉዓላዊነት በመታመን እንዴት ሰላም ማግኘት እንደምንችል ይመረምራል።', 'PERSONAL', 'peace,faith,personal growth', false, true, NOW(), 6, 189, 8, 'user2')
ON CONFLICT (id) DO NOTHING;

INSERT INTO poems (id, title, "titleAm", slug, content, "contentAm", type, featured, published, "publishedAt", views, likes, "authorId") VALUES 
('poem1', 'Grace Like Morning Dew', 'እንደ ጠዋት ቤዛ ጸጋ', 'grace-like-morning-dew', 'Grace falls like morning dew,
Fresh and new each day,
Washing away yesterday''s pain,
Lighting tomorrow''s way.

In quiet moments of the dawn,
When earth awakens slow,
I feel Your presence near me, Lord,
Your love begins to show.', 'ጸጋ እንደ ጠዋት ቤዛ ይወርዳል፣
የቀን ትኩስ እና አዲስ፣
የትናንትናን ህመም በማጠብ፣
የነገን መንገድ በማብራት።

በጠዋቱ ጸጥታ ጊዜዎች ውስጥ፣
ምድር በዝግታ ስትነቃ፣
ጌታ ሆይ፣ በአቅራቢያዬ መገኘትህን ይሰማኛል፣
ፍቅርህ ለመታየት ይጀምራል።', 'SPIRITUAL', true, true, NOW(), 156, 15, 'user2')
ON CONFLICT (id) DO NOTHING;

INSERT INTO "hero_videos" (title, "titleAm", description, "descriptionAm", "videoUrl", "isActive") VALUES 
('Watch Our Story', 'የእኛን ታሪክ ይመልከቱ', 'Discover Our Mission', 'ተልእኮአችንን ያውቁ', 'https://youtu.be/dQw4w9WgXcQ', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO "hero_categories" ("nameEn", "nameAm", "descEn", "descAm", icon, color, href, "amharicTitle", "amharicDescription", features, "isActive", "order") VALUES 
('Editorial Notes', 'የአዘጋጁ ማስታወሻ', 'Insights from our editorial team', 'ከአዘጋጆች ቡድናችን ግንዛቤዎች', 'DocumentTextIcon', 'blue', '/articles?category=EDITORIAL', 'የአዘጋጁ ማስታወሻ', 'ከአዘጋጆች ቡድናችን ግንዛቤዎች', '["Deep Analysis", "Expert Commentary", "Spiritual Insights"]', true, 1),
('Personal Growth', 'ግላዊ እድገት', 'Journey of spiritual development', 'የመንፈሳዊ እድገት ጉዞ', 'UserIcon', 'green', '/articles?category=PERSONAL', 'ግላዊ እድገት', 'የመንፈሳዊ እድገት ጉዞ', '["Character Building", "Faith Development", "Life Transformation"]', true, 2)
ON CONFLICT (id) DO NOTHING;