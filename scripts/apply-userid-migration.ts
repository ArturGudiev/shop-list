import { prisma } from '../lib/prisma';

async function applyMigration() {
  try {
    console.log('Applying userId migration: TEXT -> INTEGER...');
    
    // Change the column type from TEXT to INTEGER
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "Item" 
      ALTER COLUMN "userId" TYPE INTEGER 
      USING CASE 
        WHEN "userId" IS NULL THEN NULL 
        ELSE CAST("userId" AS INTEGER) 
      END;
    `);
    
    console.log('✅ Successfully changed userId column to INTEGER');
  } catch (error) {
    console.error('❌ Error applying migration:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

applyMigration()
  .then(() => {
    console.log('Migration completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Migration failed:', error);
    process.exit(1);
  });

