/*
  Warnings:

  - You are about to drop the column `date` on the `Transaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,name]` on the table `Pot` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Pot_name_key";

-- AlterTable
ALTER TABLE "public"."Pot" ADD COLUMN     "currentAmount" DECIMAL(12,2) NOT NULL DEFAULT 0.00;

-- AlterTable
ALTER TABLE "public"."Transaction" DROP COLUMN "date",
ADD COLUMN     "recurringBillId" TEXT;

-- CreateTable
CREATE TABLE "public"."RecurringBill" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "counterparty" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "dueDayOfMonth" INTEGER NOT NULL,

    CONSTRAINT "RecurringBill_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pot_userId_name_key" ON "public"."Pot"("userId", "name");

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_recurringBillId_fkey" FOREIGN KEY ("recurringBillId") REFERENCES "public"."RecurringBill"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RecurringBill" ADD CONSTRAINT "RecurringBill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
