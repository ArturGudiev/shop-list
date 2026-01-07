-- AlterTable: Add userId as nullable first
ALTER TABLE "public"."Item" ADD COLUMN IF NOT EXISTS "userId" TEXT;

