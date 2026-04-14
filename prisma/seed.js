const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const categories = await Promise.all([
    prisma.category.upsert({ where: { slug: 'milk' },   update: {}, create: { name: 'A2 Milk',   slug: 'milk'   } }),
    prisma.category.upsert({ where: { slug: 'ghee' },   update: {}, create: { name: 'Pure Ghee', slug: 'ghee'   } }),
    prisma.category.upsert({ where: { slug: 'paneer' }, update: {}, create: { name: 'Paneer',    slug: 'paneer' } }),
    prisma.category.upsert({ where: { slug: 'curd' },   update: {}, create: { name: 'Curd',      slug: 'curd'   } }),
    prisma.category.upsert({ where: { slug: 'lassi' },  update: {}, create: { name: 'Lassi',     slug: 'lassi'  } }),
    prisma.category.upsert({ where: { slug: 'butter' }, update: {}, create: { name: 'Butter',    slug: 'butter' } }),
  ]);
  console.log('✅ Created', categories.length, 'categories');

  const milk   = categories[0];
  const ghee   = categories[1];
  const paneer = categories[2];

  const products = await Promise.all([
    prisma.product.upsert({
      where:  { slug: 'a2-gir-cow-milk-1l' },
      update: {},
      create: {
        name: 'A2 Gir Cow Milk', slug: 'a2-gir-cow-milk-1l',
        description: 'Pure A2 beta-casein milk from our Gir cows.',
        categoryId: milk.id, price: 8000, mrp: 9000,
        unit: '1 Litre', stock: 100, images: [],
        isPerishable: true, shippingType: 'local',
      },
    }),
    prisma.product.upsert({
      where:  { slug: 'a2-bilona-ghee-500ml' },
      update: {},
      create: {
        name: 'A2 Bilona Ghee', slug: 'a2-bilona-ghee-500ml',
        description: 'Hand-churned bilona ghee. Vedic process.',
        categoryId: ghee.id, price: 79900, mrp: 99900,
        unit: '500 ml', stock: 50, images: [],
        isPerishable: false, shippingType: 'both',
      },
    }),
    prisma.product.upsert({
      where:  { slug: 'fresh-a2-paneer-250g' },
      update: {},
      create: {
        name: 'Fresh A2 Paneer', slug: 'fresh-a2-paneer-250g',
        description: 'Soft fresh paneer made daily from A2 milk.',
        categoryId: paneer.id, price: 12000, mrp: 14000,
        unit: '250 g', stock: 30, images: [],
        isPerishable: true, shippingType: 'local',
      },
    }),
  ]);
  console.log('✅ Created', products.length, 'products');
  console.log('🌱 Seed complete — Anandhyaa database is ready!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
