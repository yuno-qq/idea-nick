/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Idea` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Idea" ADD COLUMN     "email" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Idea_email_key" ON "Idea"("email");
