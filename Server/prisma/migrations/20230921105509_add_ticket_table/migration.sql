-- CreateEnum
CREATE TYPE "Ticket_Priority_Options" AS ENUM ('High', 'Medium', 'Low');

-- CreateTable
CREATE TABLE "Tickets" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "priority" "Ticket_Priority_Options" NOT NULL,
    "description" TEXT NOT NULL,
    "customersId" INTEGER NOT NULL,

    CONSTRAINT "Tickets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_customersId_fkey" FOREIGN KEY ("customersId") REFERENCES "Customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
