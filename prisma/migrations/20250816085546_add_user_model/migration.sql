-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "surname" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
