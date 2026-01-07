import { prisma } from '../lib/prisma';

async function fixDatabase() {
  try {
    console.log('Fixing userId column in database...');
    
    // First, try to add the column if it doesn't exist (as nullable)
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "Item" ADD COLUMN IF NOT EXISTS "userId" TEXT;
    `);
    
    console.log('Column added/verified');
    
    // Update all existing items with your GitHub ID
    const userId = '4563342';
    const result = await prisma.$executeRawUnsafe(`
      UPDATE "Item" SET "userId" = $1 WHERE "userId" IS NULL;
    `, userId);
    
    console.log(`Updated items with userId: ${userId}`);
    console.log('Database fix completed successfully');
  } catch (error) {
    console.error('Error fixing database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

fixDatabase()
  .then(() => {
    console.log('Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed:', error);
    process.exit(1);
  });

