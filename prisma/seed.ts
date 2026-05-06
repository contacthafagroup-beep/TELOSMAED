// @ts-nocheck
import { PrismaClient } from '@prisma/client'
import { generateSlug } from '../lib/slug'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Hash default password for seed users
  const hashedPassword = await bcrypt.hash('TelosMaed2024!', 10)

  // Create sample users
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'admin@telosmaed.com' },
      update: {},
      create: {
        email: 'admin@telosmaed.com',
        name: 'TELOS MAED Admin',
        role: 'ADMIN',
        bio: 'Administrator of TELOS MAED Christian Magazine',
        password: hashedPassword,
        verified: true,
      },
    }),
    prisma.user.upsert({
      where: { email: 'editor@telosmaed.com' },
      update: {},
      create: {
        email: 'editor@telosmaed.com',
        name: 'Daniel Tesfaye',
        role: 'EDITOR',
        bio: 'Senior Editor at TELOS MAED, passionate about Christian leadership and youth development.',
        password: hashedPassword,
        verified: true,
      },
    }),
    prisma.user.upsert({
      where: { email: 'contributor@telosmaed.com' },
      update: {},
      create: {
        email: 'contributor@telosmaed.com',
        name: 'Sara Mengistu',
        role: 'CONTRIBUTOR',
        bio: 'Writer and speaker focusing on personal growth and spiritual development.',
        password: hashedPassword,
        verified: true,
      },
    }),
  ])

  console.log('✅ Created users')

  // Create sample issues
  const currentYear = new Date().getFullYear()
  const issues = await Promise.all([
    prisma.issue.upsert({
      where: { 
        month_year: {
          month: 1,
          year: currentYear,
        }
      },
      update: {},
      create: {
        title: 'Faith in the Digital Age',
        titleAm: 'በዲጂታል ዘመን እምነት',
        slug: generateSlug('Faith in the Digital Age January 2026'),
        description: 'Exploring how technology impacts our spiritual lives and Christian witness.',
        descriptionAm: 'ቴክኖሎጂ በመንፈሳዊ ህይወታችን እና በክርስቲያናዊ ምስክርነታችን ላይ እንዴት እንደሚነካ መመርመር።',
        theme: 'Technology & Faith',
        month: 1,
        year: currentYear,
        published: true,
        publishedAt: new Date(),
        featured: true,
      },
    }),
    prisma.issue.upsert({
      where: { 
        month_year: {
          month: 12,
          year: currentYear - 1,
        }
      },
      update: {},
      create: {
        title: 'Hope for the New Year',
        titleAm: 'ለአዲሱ ዓመት ተስፋ',
        slug: generateSlug('Hope for the New Year December 2025'),
        description: 'Reflecting on God\'s faithfulness and looking forward with hope.',
        descriptionAm: 'የእግዚአብሔርን ታማኝነት በማሰላሰል እና በተስፋ ወደፊት መመልከት።',
        theme: 'Hope & Renewal',
        month: 12,
        year: currentYear - 1,
        published: true,
        publishedAt: new Date(currentYear - 1, 11, 1),
      },
    }),
  ])

  console.log('✅ Created issues')

  // Create sample articles
  const articles = await Promise.all([
    prisma.article.upsert({
      where: { slug: generateSlug('Digital Discipleship in Modern Times') },
      update: {},
      create: {
        title: 'Digital Discipleship in Modern Times',
        titleAm: 'በዘመናዊ ዘመን ዲጂታል ደቀመዝሙርነት',
        slug: generateSlug('Digital Discipleship in Modern Times'),
        excerpt: 'How technology can enhance rather than hinder our spiritual formation and Christian community.',
        excerptAm: 'ቴክኖሎጂ የመንፈሳዊ ምስረታችንን እና የክርስቲያን ማህበረሰባችንን እንዴት ማሻሻል እንደሚችል።',
        content: `# Digital Discipleship in Modern Times

In our increasingly connected world, the question isn't whether technology will impact our faith, but how we can harness it for spiritual growth and community building.

## The Challenge

Many Christians struggle with the balance between digital engagement and spiritual depth. Social media can become a distraction, but it can also be a powerful tool for ministry and connection.

## Biblical Principles for Digital Life

1. **Intentionality** - "Whatever you do, work at it with all your heart, as working for the Lord" (Colossians 3:23)
2. **Community** - "Let us consider how we may spur one another on toward love and good deeds" (Hebrews 10:24)
3. **Wisdom** - "The simple believe anything, but the prudent give thought to their steps" (Proverbs 14:15)

## Practical Applications

### Online Bible Study
Technology enables us to study Scripture with tools our ancestors could never imagine. Apps, commentaries, and online communities can deepen our understanding.

### Digital Evangelism
Social media platforms provide unprecedented opportunities to share the Gospel and connect with seekers.

### Virtual Community
Especially highlighted during the pandemic, online church services and small groups have shown us new ways to maintain fellowship.

## Conclusion

The key is not to avoid technology, but to use it intentionally for God's glory and the building of His kingdom.`,
        contentAm: `# በዘመናዊ ዘመን ዲጂታል ደቀመዝሙርነት

በተገናኘው ዓለማችን ውስጥ፣ ቴክኖሎጂ በእምነታችን ላይ ተጽዕኖ እንደሚያሳድር ጥያቄው አይደለም፣ ነገር ግን ለመንፈሳዊ እድገት እና ለማህበረሰብ ግንባታ እንዴት መጠቀም እንደምንችል ነው።

## ተግዳሮቱ

ብዙ ክርስቲያኖች በዲጂታል ተሳትፎ እና በመንፈሳዊ ጥልቀት መካከል ያለውን ሚዛን ይታገላሉ። ማህበራዊ ሚዲያ ትኩረት ማዘናጋት ሊሆን ይችላል፣ ነገር ግን ለአገልግሎት እና ለግንኙነት ኃይለኛ መሳሪያም ሊሆን ይችላል።

## ለዲጂታል ህይወት የመጽሐፍ ቅዱስ መርሆዎች

1. **ሆን ተብሎ መስራት** - "ምንም ትሰሩ፣ ለጌታ እንደምትሰሩ በሙሉ ልባችሁ ስሩ" (ቆላስይስ 3፥23)
2. **ማህበረሰብ** - "እርስ በርሳችን እንዴት ወደ ፍቅር እና ወደ መልካም ሥራ እንደምናነሳሳ እናስብ" (ዕብራውያን 10፥24)
3. **ጥበብ** - "ቀላሉ ሁሉንም ያምናል፣ ነገር ግን ጥንቃቄ የሚያደርገው ለእርምጃዎቹ ያስባል" (ምሳሌ 14፥15)

## ተግባራዊ አተገባበሮች

### የመስመር ላይ የመጽሐፍ ቅዱስ ጥናት
ቴክኖሎጂ የቀደሙት አባቶቻችን ሊያስቡት የማይችሉትን መሳሪያዎች በመጠቀም መጽሐፍ ቅዱስን እንድናጠና ያስችለናል።

### ዲጂታል ወንጌል ስብከት
የማህበራዊ ሚዲያ መድረኮች ወንጌልን ለማካፈል እና ከፈላጊዎች ጋር ለመገናኘት ከዚህ በፊት ታይቶ የማይታወቅ እድል ይሰጣሉ።

### ምናባዊ ማህበረሰብ
በተለይ በወረርሽኙ ወቅት የተጎላ፣ የመስመር ላይ የቤተክርስቲያን አገልግሎቶች እና ትናንሽ ቡድኖች አዳዲስ የህብረት መንገዶችን አሳይተውናል።

## ማጠቃለያ

ቁልፉ ቴክኖሎጂን ማስወገድ ሳይሆን ለእግዚአብሔር ክብር እና ለመንግሥቱ ግንባታ ሆን ተብሎ መጠቀም ነው።`,
        category: 'EDITORIAL',
        tags: 'technology,discipleship,digital,community',
        authorId: users[1].id,
        issueId: issues[0].id,
        published: true,
        publishedAt: new Date(),
        featured: true,
        readTime: 8,
      },
    }),
    prisma.article.upsert({
      where: { slug: generateSlug('The Art of Christian Leadership') },
      update: {},
      create: {
        title: 'The Art of Christian Leadership',
        titleAm: 'የክርስቲያን አመራር ጥበብ',
        slug: generateSlug('The Art of Christian Leadership'),
        excerpt: 'Exploring servant leadership principles that transform communities and organizations.',
        excerptAm: 'ማህበረሰቦችን እና ድርጅቶችን የሚቀይሩ የአገልጋይ አመራር መርሆዎችን መመርመር።',
        content: `# The Art of Christian Leadership

Christian leadership is fundamentally different from worldly leadership. It's rooted in service, humility, and love rather than power, control, and self-interest.

## Jesus as Our Model

Christ demonstrated perfect leadership through:
- **Servant's Heart** - He washed the disciples' feet
- **Sacrificial Love** - He gave His life for others
- **Humble Authority** - He led with gentleness and strength

## Key Principles

### 1. Lead by Example
"Be imitators of me, as I am of Christ" (1 Corinthians 11:1)

### 2. Develop Others
Great leaders create more leaders, not just followers.

### 3. Stay Connected to the Source
Regular prayer and Scripture study are non-negotiable.

## Practical Applications

- Listen more than you speak
- Admit mistakes and learn from them
- Celebrate others' successes
- Make decisions based on biblical principles
- Invest in relationships, not just results

## Conclusion

Christian leadership is about influence, not position. It's about serving others and pointing them to Christ.`,
        contentAm: `# የክርስቲያን አመራር ጥበብ

የክርስቲያን አመራር ከዓለማዊ አመራር በመሠረቱ ይለያል። በአገልግሎት፣ በትህትና እና በፍቅር ላይ የተመሠረተ እንጂ በሥልጣን፣ በቁጥጥር እና በራስ ፍላጎት ላይ አይደለም።

## ኢየሱስ እንደ ሞዴላችን

ክርስቶስ ፍጹም አመራርን አሳይቷል በ:
- **የአገልጋይ ልብ** - የደቀመዝሙሩን እግር ታጠበ
- **መስዋዕታዊ ፍቅር** - ለሌሎች ህይወቱን ሰጠ
- **ትሑት ሥልጣን** - በየዋህነት እና በጥንካሬ መራ

## ቁልፍ መርሆዎች

### 1. በምሳሌ መምራት
"እኔ የክርስቶስ ተመሳሳይ እንደሆንኩ እናንተም የእኔ ተመሳሳይ ሁኑ" (1ኛ ቆሮንቶስ 11፥1)

### 2. ሌሎችን ማዳበር
ታላላቅ መሪዎች ተከታዮችን ብቻ ሳይሆን ተጨማሪ መሪዎችን ይፈጥራሉ።

### 3. ከምንጩ ጋር ተገናኝተው መቆየት
መደበኛ ጸሎት እና የመጽሐፍ ቅዱስ ጥናት ተደራደር የማይሆኑ ናቸው።

## ተግባራዊ አተገባበሮች

- ከመናገር የበለጠ ማዳመጥ
- ስህተቶችን መቀበል እና ከእነሱ መማር
- የሌሎችን ስኬቶች ማክበር
- በመጽሐፍ ቅዱሳዊ መርሆዎች ላይ በመመስረት ውሳኔ ማድረግ
- በውጤቶች ብቻ ሳይሆን በግንኙነቶች ላይ ኢንቨስት ማድረግ

## ማጠቃለያ

የክርስቲያን አመራር ስለ ተጽዕኖ እንጂ ስለ ቦታ አይደለም። ሌሎችን ማገልገል እና ወደ ክርስቶስ መጠቆም ነው።`,
        category: 'LEADERSHIP',
        tags: 'leadership,service,christian-living',
        authorId: users[1].id,
        issueId: issues[0].id,
        published: true,
        publishedAt: new Date(Date.now() - 86400000), // 1 day ago
        readTime: 6,
      },
    }),
    prisma.article.upsert({
      where: { slug: generateSlug('Growing in Personal Holiness') },
      update: {},
      create: {
        title: 'Growing in Personal Holiness',
        titleAm: 'በግል ቅድስና ማደግ',
        slug: generateSlug('Growing in Personal Holiness'),
        excerpt: 'Practical steps for spiritual growth and character development in daily life.',
        excerptAm: 'በዕለት ተዕለት ህይወት ውስጥ ለመንፈሳዊ እድገት እና ለባህሪ ልማት ተግባራዊ እርምጃዎች።',
        content: `# Growing in Personal Holiness

Holiness is not about perfection, but about being set apart for God's purposes and growing in Christlikeness.

## Understanding Holiness

Holiness means:
- Being separated unto God
- Reflecting Christ's character
- Living according to God's standards
- Growing in spiritual maturity

## The Process of Sanctification

### 1. Positional Holiness
We are declared holy through Christ's sacrifice.

### 2. Progressive Holiness
We grow in holiness through daily choices and God's grace.

### 3. Perfect Holiness
We will be completely holy in eternity.

## Practical Steps

### Daily Disciplines
- **Prayer** - Regular communication with God
- **Scripture Reading** - Daily intake of God's Word
- **Worship** - Acknowledging God's greatness
- **Fellowship** - Community with other believers

### Character Development
- Practice forgiveness
- Cultivate gratitude
- Develop self-control
- Show compassion

### Avoiding Sin
- Identify personal weaknesses
- Create accountability relationships
- Flee from temptation
- Confess and repent quickly

## The Role of the Holy Spirit

The Holy Spirit:
- Convicts us of sin
- Empowers us to live righteously
- Produces fruit in our lives
- Guides us into truth

## Conclusion

Growing in holiness is a lifelong journey that requires intentionality, dependence on God, and community support.`,
        contentAm: `# በግል ቅድስና ማደግ

ቅድስና ስለ ፍጽምና ሳይሆን ለእግዚአብሔር ዓላማዎች መለየት እና በክርስቶስ መምሰል ማደግ ነው።

## ቅድስናን መረዳት

ቅድስና ማለት:
- ለእግዚአብሔር መለየት
- የክርስቶስን ባህሪ ማንፀባረቅ
- በእግዚአብሔር ደረጃዎች መኖር
- በመንፈሳዊ ብስለት ማደግ

## የቅድስና ሂደት

### 1. የቦታ ቅድስና
በክርስቶስ መስዋዕትነት ቅዱስ ተብለን ተወስነናል።

### 2. ተራማጅ ቅድስና
በዕለታዊ ምርጫዎች እና በእግዚአብሔር ጸጋ በቅድስና እናድጋለን።

### 3. ፍጹም ቅድስና
በዘላለም ሙሉ በሙሉ ቅዱሳን እንሆናለን።

## ተግባራዊ እርምጃዎች

### ዕለታዊ ዲሲፕሊኖች
- **ጸሎት** - ከእግዚአብሔር ጋር መደበኛ ግንኙነት
- **የመጽሐፍ ቅዱስ ንባብ** - የእግዚአብሔርን ቃል ዕለታዊ መውሰድ
- **አምልኮ** - የእግዚአብሔርን ታላቅነት መቀበል
- **ህብረት** - ከሌሎች አማኞች ጋር ማህበረሰብ

### የባህሪ ልማት
- ይቅርታን መለማመድ
- ምስጋናን ማዳበር
- ራስን መቆጣጠርን ማዳበር
- ርኅራኄን ማሳየት

### ኃጢአትን ማስወገድ
- የግል ድክመቶችን መለየት
- የተጠያቂነት ግንኙነቶችን መፍጠር
- ከፈተና መሸሽ
- በፍጥነት መናዘዝ እና መንሰሐ

## የመንፈስ ቅዱስ ሚና

መንፈስ ቅዱስ:
- ስለ ኃጢአት ያሳምነናል
- በጽድቅ እንድንኖር ያብቃናል
- በህይወታችን ውስጥ ፍሬ ያፈራል
- ወደ እውነት ይመራናል

## ማጠቃለያ

በቅድስና ማደግ ሆን ተብሎ መስራትን፣ በእግዚአብሔር ላይ መታመንን እና የማህበረሰብ ድጋፍን የሚፈልግ የህይወት ጉዞ ነው።`,
        category: 'PERSONAL',
        tags: 'holiness,spiritual-growth,character,sanctification',
        authorId: users[2].id,
        issueId: issues[1].id,
        published: true,
        publishedAt: new Date(Date.now() - 172800000), // 2 days ago
        readTime: 7,
      },
    }),
  ])

  console.log('✅ Created articles')

  // Create sample poems
  const poems = await Promise.all([
    prisma.poem.upsert({
      where: { slug: generateSlug('Grace Like Morning Dew') },
      update: {},
      create: {
        title: 'Grace Like Morning Dew',
        titleAm: 'እንደ ጠዋት ጤዛ ጸጋ',
        slug: generateSlug('Grace Like Morning Dew'),
        content: `Grace falls like morning dew,
Fresh and new each day,
Washing away yesterday's failures,
Lighting tomorrow's way.

In the quiet of dawn's breaking,
When the world is still asleep,
Your mercy finds me waiting,
Your promises to keep.

Like dewdrops on the petals,
Glistening in the light,
Your grace adorns my spirit,
Making everything bright.

O Lord, Your love surrounds me,
Like mist upon the ground,
In every breath I'm taking,
Your faithfulness is found.`,
        contentAm: `ጸጋ እንደ ጠዋት ጤዛ ይወርዳል፣
በየቀኑ ትኩስ እና አዲስ፣
የትናንትናን ውድቀቶች እያጠበ፣
የነገን መንገድ እያበራ።

በጠዋት መሰባበር ጸጥታ ውስጥ፣
ዓለም በምትተኛበት ጊዜ፣
ርኅራኄህ እየጠበቅኩ ያገኘኛል፣
ተስፋዎችህን ለመጠበቅ።

እንደ በአበባ ቅጠሎች ላይ ጤዛ፣
በብርሃን እየተወዋወጠ፣
ጸጋህ መንፈሴን ያጌጠዋል፣
ሁሉንም ነገር ያበራዋል።

ወይ ጌታ፣ ፍቅርህ ይከብበኛል፣
እንደ በመሬት ላይ ጭጋግ፣
በምወስደው እያንዳንዱ እስትንፋስ ውስጥ፣
ታማኝነትህ ይገኛል።`,
        type: 'WORSHIP',
        authorId: users[2].id,
        issueId: issues[0].id,
        published: true,
        publishedAt: new Date(),
        featured: true,
      },
    }),
    prisma.poem.upsert({
      where: { slug: generateSlug('The Potters Hands') },
      update: {},
      create: {
        title: 'The Potter\'s Hands',
        titleAm: 'የሸክላ ሰሪው እጆች',
        slug: generateSlug('The Potters Hands'),
        content: `In the Potter's gentle hands I rest,
Shaped by love, refined by fire,
Each pressure point, each turning test,
Molding me to His desire.

The clay may crack, the wheel may turn,
But steady are the hands that hold,
Through every lesson I must learn,
A masterpiece begins to unfold.

Not by my strength or my design,
But by His wisdom, pure and true,
This vessel becomes wholly Thine,
Fashioned for the work You'd have me do.

O Master Potter, have Your way,
Transform this lump of earthen clay,
Until Your image I display,
And bring You glory every day.`,
        contentAm: `በሸክላ ሰሪው የዋህ እጆች ውስጥ እረፍ አደርጋለሁ፣
በፍቅር የተቀረፀ፣ በእሳት የተጣራ፣
እያንዳንዱ የጫና ነጥብ፣ እያንዳንዱ የመዞሪያ ፈተና፣
ወደ ፍላጎቱ እየቀረፀኝ።

ሸክላው ሊሰነጠቅ ይችላል፣ ዊሉ ሊዞር ይችላል፣
ነገር ግን የሚይዙት እጆች ቋሚ ናቸው፣
መማር ያለብኝን እያንዳንዱ ትምህርት በኩል፣
ድንቅ ስራ መገለጥ ይጀምራል።

በእኔ ጥንካሬ ወይም በእኔ ንድፍ ሳይሆን፣
ነገር ግን በእርሱ ጥበብ፣ ንጹህ እና እውነተኛ፣
ይህ ዕቃ ሙሉ በሙሉ የአንተ ይሆናል፣
እንድሰራው ለምትፈልገው ስራ የተቀረፀ።

ወይ ዋና ሸክላ ሰሪ፣ መንገድህን ውሰድ፣
ይህንን የሸክላ ቁራጭ ቀይር፣
ምስልህን እስክያሳይ ድረስ፣
እና በየቀኑ ክብር እስካመጣልህ ድረስ።`,
        type: 'SPIRITUAL',
        authorId: users[1].id,
        issueId: issues[0].id,
        published: true,
        publishedAt: new Date(Date.now() - 86400000),
      },
    }),
  ])

  console.log('✅ Created poems')

  // Create sample settings
  await Promise.all([
    prisma.settings.upsert({
      where: { key: 'site_title' },
      update: {},
      create: {
        key: 'site_title',
        value: 'TELOS MAED - Christian Magazine',
        type: 'STRING',
      },
    }),
    prisma.settings.upsert({
      where: { key: 'site_description' },
      update: {},
      create: {
        key: 'site_description',
        value: 'An Evangelical Christian intellectual magazine focused on faith, leadership, youth culture, and creative worship.',
        type: 'STRING',
      },
    }),
    prisma.settings.upsert({
      where: { key: 'articles_per_page' },
      update: {},
      create: {
        key: 'articles_per_page',
        value: '12',
        type: 'NUMBER',
      },
    }),
    prisma.settings.upsert({
      where: { key: 'enable_comments' },
      update: {},
      create: {
        key: 'enable_comments',
        value: 'true',
        type: 'BOOLEAN',
      },
    }),
  ])

  console.log('✅ Created settings')

  // Create sample newsletter subscriptions
  await Promise.all([
    prisma.newsletterSubscription.upsert({
      where: { email: 'subscriber1@example.com' },
      update: {},
      create: {
        email: 'subscriber1@example.com',
        name: 'John Doe',
        active: true,
      },
    }),
    prisma.newsletterSubscription.upsert({
      where: { email: 'subscriber2@example.com' },
      update: {},
      create: {
        email: 'subscriber2@example.com',
        name: 'Jane Smith',
        active: true,
      },
    }),
  ])

  console.log('✅ Created newsletter subscriptions')

  // Create Hero Categories
  await Promise.all([
    prisma.heroCategory.upsert({
      where: { id: 1 },
      update: {},
      create: {
        id: 1,
        nameEn: "Editorial",
        nameAm: "አርታዒ",
        descEn: "Editorial",
        descAm: "አርታዒ",
        icon: "📝",
        color: "from-blue-500/10 to-blue-600/10 border-blue-200",
        href: "/articles?category=editorial",
        amharicTitle: "አርታዒ - የአርታዒ ጽሑፎች",
        amharicDescription: "አርታዒ ክፍል የአርታዒ ጽሑፎችን እና የአስተያየት ጽሑፎችን ያካትታል።",
        features: JSON.stringify(["የአርታዒ ጽሑፎች", "የአስተያየት ጽሑፎች", "የመሪዎች አስተያየት", "የወቅታዊ ጉዳዮች ትንተና"]),
        isActive: true,
        order: 1,
      },
    }),
    prisma.heroCategory.upsert({
      where: { id: 2 },
      update: {},
      create: {
        id: 2,
        nameEn: "Personal Growth",
        nameAm: "ግለሰባዊ",
        descEn: "Growth",
        descAm: "ግለሰባዊ",
        icon: "🌱",
        color: "from-green-500/10 to-green-600/10 border-green-200",
        href: "/articles?category=personal",
        amharicTitle: "ግለሰባዊ - የግል እድገት",
        amharicDescription: "ግለሰባዊ ክፍል የግል እድገት እና የመንፈሳዊ እድገት ላይ የሚያተኩሩ ጽሑፎችን ያካትታል።",
        features: JSON.stringify(["የግል ጸሎት እና እድገት", "የባህሪ ልማት መመሪያዎች", "የመንፈሳዊ ዲሲፕሊኖች", "የግል ምስክርነቶች"]),
        isActive: true,
        order: 2,
      },
    }),
    prisma.heroCategory.upsert({
      where: { id: 3 },
      update: {},
      create: {
        id: 3,
        nameEn: "Leadership",
        nameAm: "የመሪነት",
        descEn: "Leadership",
        descAm: "የመሪነት",
        icon: "👑",
        color: "from-purple-500/10 to-purple-600/10 border-purple-200",
        href: "/articles?category=leadership",
        amharicTitle: "የመሪነት - አመራር",
        amharicDescription: "የመሪነት ክፍል የክርስቲያን አመራር ላይ የሚያተኩሩ ጽሑፎችን ያካትታል።",
        features: JSON.stringify(["የክርስቲያን አመራር መርሆዎች", "የቤተክርስቲያን አመራር", "የወጣቶች እና ቤተሰብ አመራር", "የሕዝብ የሰው ተሳትፎ"]),
        isActive: true,
        order: 3,
      },
    }),
    prisma.heroCategory.upsert({
      where: { id: 4 },
      update: {},
      create: {
        id: 4,
        nameEn: "Poetry",
        nameAm: "ግጥም",
        descEn: "Poetry",
        descAm: "ግጥም",
        icon: "🎭",
        color: "from-rose-500/10 to-rose-600/10 border-rose-200",
        href: "/poetry",
        amharicTitle: "ግጥም - የመንፈሳዊ ግጥም",
        amharicDescription: "ግጥም ክፍል የመንፈሳዊ ግጥሞችን እና የአምልኮ ጽሑፎችን ያካትታል።",
        features: JSON.stringify(["የመንፈሳዊ ግጥሞች", "የአምልኮ እና የምስጋና ግጥሞች", "የግጥም ጥናት ስራዎች", "የአምልኮ አመልካች ልምዶች"]),
        isActive: false,
        order: 4,
      },
    }),
  ])

  console.log('✅ Created hero categories')

  // Create Hero Video
  await prisma.heroVideo.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      title: "Watch Our Story",
      titleAm: "የእኛን ታሪክ ይመልከቱ",
      description: "Discover Our Mission",
      descriptionAm: "ተልእኮአችንን ያውቁ",
      videoUrl: "https://youtu.be/8fwogSOqGIk?si=C0z_VW7awBbQp6ai",
      isActive: true,
    },
  })

  console.log('✅ Created hero video')

  console.log('🎉 Database seeded successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
