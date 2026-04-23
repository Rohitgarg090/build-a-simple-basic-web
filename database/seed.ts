/**
 * seed.ts — Database seed for Simple Web Calculator
 * Run with: npx ts-node database/seed.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('🌱 Seeding database...');

  // ------------------------------------------------------------------
  // 1. Default App Configuration
  // ------------------------------------------------------------------
  const configEntries = [
    {
      key: 'max_history_records',
      value: '100',
    },
    {
      key: 'app_name',
      value: 'Web Calculator',
    },
    {
      key: 'decimal_precision',
      value: '10',
    },
  ];

  for (const entry of configEntries) {
    await prisma.appConfig.upsert({
      where: { key: entry.key },
      update: { value: entry.value },
      create: entry,
    });
    console.log(`  ✔ Config set — ${entry.key}: ${entry.value}`);
  }

  // ------------------------------------------------------------------
  // 2. Sample Calculation History Records
  // ------------------------------------------------------------------
  const sampleHistory = [
    { expression: '5 + 3',    result: '8'   },
    { expression: '10 - 4',   result: '6'   },
    { expression: '7 * 6',    result: '42'  },
    { expression: '20 / 4',   result: '5'   },
    { expression: '3.5 + 1.5',result: '5'   },
    { expression: '100 / 3',  result: '33.3333333333' },
  ];

  await prisma.calculationHistory.createMany({
    data: sampleHistory,
    skipDuplicates: true,
  });
  console.log(`  ✔ Inserted ${sampleHistory.length} sample history records`);

  console.log('\n✅ Seed complete!');
}

main()
  .catch((err) => {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
}