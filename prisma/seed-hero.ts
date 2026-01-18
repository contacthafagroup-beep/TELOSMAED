import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding hero data...')

  // Seed categories
  const categories = await prisma.heroCategory.createMany({
    data: [
      {
        nameEn: 'Editorial',
        nameAm: 'የአዘጋጁ ማስታወሻ',
        descEn: 'Editorial',
        descAm: 'የአዘጋጁ ማስታወሻ',
        icon: '✍️',
        color: 'from-blue-500/10 to-blue-600/10 border-blue-200',
        href: '/articles?category=editorial',
        amharicTitle: 'የአዘጋጁ ማስታወሻ',
        amharicDescription: 'የአዘጋጁ ማስታወሻ ክፍል የቴሎስ ማዕድ መጽሔት ዋና አዘጋጆች እና የአዘጋጅ ቡድን አባላት የሚጽፉበት ክፍል ነው። በዚህ ክፍል ውስጥ፣ የወቅቱ ጉዳዮች፣ የሃይማኖት እና የማህበረሰብ ጉዳዮች፣ እንዲሁም የመጽሔቱ አቅጣጫ እና ራዕይ ላይ ጥልቅ ትንተና እና አስተያየት ይገኛል።',
        features: JSON.stringify(['የወቅቱ ጉዳዮች ትንተና', 'የእምነት መመሪያዎች', 'የመጽሔቱ ራዕይ እና ተልእኮ', 'የአዘጋጅ ቡድን አስተያየቶች']),
        isActive: true,
        order: 1
      },
      {
        nameEn: 'Personal Growth',
        nameAm: 'ሰውነት',
        descEn: 'Growth',
        descAm: 'ሰውነት',
        icon: '🌱',
        color: 'from-green-500/10 to-green-600/10 border-green-200',
        href: '/articles?category=personal',
        amharicTitle: 'ሰውነት - የግል እድገት',
        amharicDescription: 'ሰውነት ክፍል የግል እድገት እና የመንፈሳዊ ብስለት ላይ የሚያተኩር ክፍል ነው። ይህ ክፍል ወጣት ክርስቲያኖች በእምነት ጉዞአቸው ውስጥ እንዴት እንደሚያድጉ፣ ባህሪያቸውን እንዴት እንደሚቀርፁ እና ከእግዚአብሔር ጋር ያላቸውን ግንኙነት እንዴት እንደሚያጠናክሩ ይመለከታል።',
        features: JSON.stringify(['የግል ጸሎት እና ጥናት', 'የባህሪ ለውጥ መመሪያዎች', 'የመንፈሳዊ ዲሲፕሊን', 'የግል ምስክርነቶች']),
        isActive: true,
        order: 2
      },
      {
        nameEn: 'Leadership',
        nameAm: 'የመሪ በትር',
        descEn: 'Leadership',
        descAm: 'የመሪ በትር',
        icon: '👑',
        color: 'from-purple-500/10 to-purple-600/10 border-purple-200',
        href: '/articles?category=leadership',
        amharicTitle: 'የመሪ በትር - አመራር',
        amharicDescription: 'የመሪ በትር ክፍል የክርስቲያን አመራር ላይ የሚያተኩር ክፍል ነው። ይህ ክፍል ወጣት ክርስቲያኖች በተለያዩ የህይወት ዘርፎች ውስጥ እንዴት መሪ እንደሚሆኑ፣ እንዴት ተጽዕኖ እንደሚያሳድሩ እና እንዴት ለለውጥ ወኪል እንደሚሆኑ ይመለከታል።',
        features: JSON.stringify(['የክርስቲያን አመራር መርሆዎች', 'የቤተክርስቲያን አመራር', 'የንግድ እና ሙያ አመራር', 'የማህበረሰብ ተጽዕኖ']),
        isActive: true,
        order: 3
      },
      {
        nameEn: 'Poetry',
        nameAm: 'ግጥም',
        descEn: 'Poetry',
        descAm: 'ግጥም',
        icon: '🎭',
        color: 'from-rose-500/10 to-rose-600/10 border-rose-200',
        href: '/poetry',
        amharicTitle: 'ግጥም - የመንፈሳዊ ግጥም',
        amharicDescription: 'ግጥም ክፍል የመንፈሳዊ ግጥሞች እና የፈጠራ ጽሑፎች የሚገኙበት ክፍል ነው። ይህ ክፍል ወጣት ክርስቲያኖች እምነታቸውን በጥበብ እና በፈጠራ እንዴት እንደሚገልጹ ያሳያል። ግጥሞቹ የእግዚአብሔርን ፍቅር፣ ጸጋ፣ እና ታማኝነት ያወድሳሉ።',
        features: JSON.stringify(['የመንፈሳዊ ግጥሞች', 'የአምልኮ እና ምስጋና ግጥሞች', 'የወጣት ገጣሚዎች ስራዎች', 'የፈጠራ አምልኮ መግለጫዎች']),
        isActive: true,
        order: 4
      }
    ]
  })
  console.log(`✅ Created ${categories.count} categories`)

  // Seed video
  const video = await prisma.heroVideo.create({
    data: {
      title: 'Watch Our Story',
      titleAm: 'የእኛን ታሪክ ይመልከቱ',
      description: 'Discover Our Mission',
      descriptionAm: 'ተልእኳችንን ያውቁ',
      videoUrl: '',
      isActive: true
    }
  })
  console.log(`✅ Created hero video`)

  // Seed magazine (commented out - model doesn't exist yet)
  /*
  const magazine = await prisma.heroMagazine.create({
    data: {
      title: 'TELOS MAED',
      titleAm: 'ቴሎስ ማዕድ',
      subtitle: 'Where Faith Meets Intellect',
      subtitleAm: 'እምነት እና ምሁራዊነት የሚገናኙበት',
      coverImage: '',
      issue: 'Latest Issue',
      publishDate: new Date().toISOString().split('T')[0],
      isActive: true
    }
  })
  console.log(`✅ Created hero magazine`)
  */

  console.log('\n🎉 Hero data seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding data:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
