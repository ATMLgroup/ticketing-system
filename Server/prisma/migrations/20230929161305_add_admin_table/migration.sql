/*
  Warnings:

  - You are about to drop the column `customersId` on the `Tickets` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Tickets` table. All the data in the column will be lost.
  - Added the required column `customerId` to the `Tickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Tickets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Ticket_Status_Options" AS ENUM ('Open', 'Pending', 'Close');

-- DropForeignKey
ALTER TABLE "Tickets" DROP CONSTRAINT "Tickets_customersId_fkey";

-- AlterTable
ALTER TABLE "Tickets" DROP COLUMN "customersId",
DROP COLUMN "description",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "customerId" INTEGER NOT NULL,
ADD COLUMN     "status" "Ticket_Status_Options" NOT NULL;

-- CreateTable
CREATE TABLE "Chats" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,
    "ticketId" INTEGER NOT NULL,

    CONSTRAINT "Chats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Amins" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Amins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Amins_email_key" ON "Amins"("email");

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chats" ADD CONSTRAINT "Chats_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
