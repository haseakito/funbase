/*
  Warnings:

  - The primary key for the `Purchase` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Purchase` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `StripeAccount` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Purchase_userId_postId_idx";

-- AlterTable
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Purchase_pkey" PRIMARY KEY ("userId", "postId");

-- CreateIndex
CREATE UNIQUE INDEX "StripeAccount_userId_key" ON "StripeAccount"("userId");
