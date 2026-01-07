import { prisma } from '../lib/prisma';

async function updateItemsWithUserId() {
  try {
    const userId = '4563342'; // Your GitHub ID
    
    console.log('Updating all items with userId:', userId);
    
    // First, let's see how many items exist
    const allItems = await prisma.item.findMany();
    console.log(`Found ${allItems.length} items in database`);
    
    // Update all items with the userId
    const result = await prisma.item.updateMany({
      data: {
        userId: Number(userId)
      }
    });
    
    console.log(`Updated ${result.count} items with userId: ${userId}`);
  } catch (error) {
    console.error('Error updating items:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

updateItemsWithUserId()
  .then(() => {
    console.log('Migration completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Migration failed:', error);
    process.exit(1);
  });

