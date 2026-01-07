-- First, add userId column as nullable
ALTER TABLE "public"."Item" ADD COLUMN IF NOT EXISTS "userId" TEXT;

-- Update all existing items with your GitHub ID
UPDATE "public"."Item" SET "userId" = '4563342' WHERE "userId" IS NULL;

