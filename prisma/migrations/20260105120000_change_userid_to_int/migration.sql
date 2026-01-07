-- AlterTable: Change userId from TEXT to INTEGER
ALTER TABLE "public"."Item" 
ALTER COLUMN "userId" TYPE INTEGER 
USING CASE 
  WHEN "userId" IS NULL THEN NULL 
  ELSE CAST("userId" AS INTEGER) 
END;

