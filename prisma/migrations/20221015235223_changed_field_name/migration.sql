/*
  Warnings:

  - You are about to drop the column `lastBalance` on the `contract_indicators` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "contract_indicators" DROP COLUMN "lastBalance",
ADD COLUMN     "historyBalance" JSON[] DEFAULT ARRAY[]::JSON[];
