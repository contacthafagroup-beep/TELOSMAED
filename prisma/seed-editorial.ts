import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding editorial categories...')

  const categories = [
    {
      icon: '✍️',
      nameAm: 'የአዘጋጁ ማስታወሻ',
      nameEn: 'Editorial Notes',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100',
      descriptionAm: 'የአዘጋጁ ማስታወሻ ክፍል የቴሎስ ማዕድ መጽሔት ዋና አዘጋጆች እና የአዘጋጅ ቡድን አባላት የሚጽፉበት ክፍል ነው። በዚህ ክፍል ውስጥ፣ የወቅቱ ጉዳዮች፣ የሃይማኖት እና የማህበረሰብ ጉዳዮች፣ እንዲሁም የመጽሔቱ አቅጣጫ እና ራዕይ ላይ ጥልቅ ትንተና እና አስተያየት ይገኛል።',
      descriptionEn: 'Editorial Notes is where TELOS MAED editors and editorial team members share their insights. This section features deep analysis and commentary on current issues, religious and social matters, as well as the magazine\'s direction and vision.',
      featuresAm: JSON.stringify([
        'የወቅቱ ጉዳዮች ትንተና',
        'የእምነት መመሪያዎች',
        'የመጽሔቱ ራዕይ እና ተልእኮ',
        'የአዘጋጅ ቡድን አስተያየቶች'
      ]),
      featuresEn: JSON.stringify([
        'Current issues analysis',
        'Faith guidance',
        'Magazine vision and mission',
        'Editorial team insights'
      ]),
      articles: 45,
      readers: '2.5K',
      rating: '4.8',
      order: 1
    },
    {
      icon: '🌱',
      nameAm: 'ሰውነት',
      nameEn: 'Personal Growth',
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100',
      descriptionAm: 'ሰውነት ክፍል የግል እድገት እና የመንፈሳዊ ብስለት ላይ የሚያተኩር ክፍል ነው። ይህ ክፍል ወጣት ክርስቲያኖች በእምነት ጉዞአቸው ውስጥ እንዴት እንደሚያድጉ፣ ባህሪያቸውን እንዴት እንደሚቀርፁ እና ከእግዚአብሔር ጋር ያላቸውን ግንኙነት እንዴት እንደሚያጠናክሩ ይመለከታል።',
      descriptionEn: 'Personal Growth focuses on individual development and spiritual maturity. This section explores how young Christians can grow in their faith journey, shape their character, and strengthen their relationship with God.',
      featuresAm: JSON.stringify([
        'የግል ጸሎት እና ጥናት',
        'የባህሪ ለውጥ መመሪያዎች',
        'የመንፈሳዊ ዲሲፕሊን',
        'የግል ምስክርነቶች'
      ]),
      featuresEn: JSON.stringify([
        'Personal prayer and study',
        'Character transformation guides',
        'Spiritual disciplines',
        'Personal testimonies'
      ]),
      articles: 38,
      readers: '3.1K',
      rating: '4.9',
      order: 2
    },
    {
      icon: '👑',
      nameAm: 'የመሪ በትር',
      nameEn: 'Leadership',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100',
      descriptionAm: 'የመሪ በትር ክፍል የክርስቲያን አመራር ላይ የሚያተኩር ክፍል ነው። ይህ ክፍል ወጣት ክርስቲያኖች በተለያዩ የህይወት ዘርፎች ውስጥ እንዴት መሪ እንደሚሆኑ፣ እንዴት ተጽዕኖ እንደሚያሳድሩ እና እንዴት ለለውጥ ወኪል እንደሚሆኑ ይመለከታል።',
      descriptionEn: 'Leadership focuses on Christian leadership principles. This section explores how young Christians can become leaders in various life spheres, create positive influence, and become agents of change in their communities.',
      featuresAm: JSON.stringify([
        'የክርስቲያን አመራር መርሆዎች',
        'የቤተክርስቲያን አመራር',
        'የንግድ እና ሙያ አመራር',
        'የማህበረሰብ ተጽዕኖ'
      ]),
      featuresEn: JSON.stringify([
        'Christian leadership principles',
        'Church leadership',
        'Business and career leadership',
        'Community impact'
      ]),
      articles: 32,
      readers: '2.8K',
      rating: '4.7',
      order: 3
    },
    {
      icon: '🎭',
      nameAm: 'ግጥም',
      nameEn: 'Poetry',
      color: 'from-rose-500 to-rose-600',
      bgColor: 'from-rose-50 to-rose-100',
      descriptionAm: 'ግጥም ክፍል የመንፈሳዊ ግጥሞች እና የፈጠራ ጽሑፎች የሚገኙበት ክፍል ነው። ይህ ክፍል ወጣት ክርስቲያኖች እምነታቸውን በጥበብ እና በፈጠራ እንዴት እንደሚገልጹ ያሳያል። ግጥሞቹ የእግዚአብሔርን ፍቅር፣ ጸጋ፣ እና ታማኝነት ያወድሳሉ።',
      descriptionEn: 'Poetry is a section dedicated to spiritual poems and creative writings. This section showcases how young Christians express their faith through art and creativity. The poems praise God\'s love, grace, and faithfulness.',
      featuresAm: JSON.stringify([
        'የመንፈሳዊ ግጥሞች',
        'የአምልኮ እና ምስጋና ግጥሞች',
        'የወጣት ገጣሚዎች ስራዎች',
        'የፈጠራ አምልኮ መግለጫዎች'
      ]),
      featuresEn: JSON.stringify([
        'Spiritual poetry',
        'Worship and praise poems',
        'Young poets\' works',
        'Creative worship expressions'
      ]),
      articles: 28,
      readers: '1.9K',
      rating: '4.6',
      order: 4
    }
  ]

  for (const category of categories) {
    await prisma.editorialCategory.upsert({
      where: { id: category.order },
      update: category,
      create: category
    })
  }

  console.log('✅ Editorial categories seeded successfully!')
}

main()
  .catch((e) => {
    console.error('Error seeding editorial categories:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
