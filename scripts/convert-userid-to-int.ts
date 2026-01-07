import { prisma } from '../lib/prisma';

async function convertUserIdToInt() {
  try {
    console.log('Converting userId from String to Int...');
    
    // First, update all existing userId values from string to int
    // PostgreSQL: CAST userId to INTEGER
    const result = await prisma.$executeRawUnsafe(`
      ALTER TABLE "Item" 
      ALTER COLUMN "userId" TYPE INTEGER 
      USING CASE 
        WHEN "userId" IS NULL THEN NULL 
        ELSE CAST("userId" AS INTEGER) 
      END;
    `);
    
    console.log('✅ Successfully converted userId column to INTEGER');
    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Error converting userId:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

convertUserIdToInt()
  .then(() => {
    console.log('Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed:', error);
    process.exit(1);
  });

