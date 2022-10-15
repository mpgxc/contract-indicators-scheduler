-- CreateEnum
CREATE TYPE "FrequencyPattern" AS ENUM ('DAILY_1', 'WEEKLY_7', 'BIWEEKLY_15', 'MONTHLY_30', 'BIMONTHLY_60', 'QUARTERLY_90', 'SEMESTERLY_180', 'YEARLY_365');

-- CreateEnum
CREATE TYPE "ContractIndicatorType" AS ENUM ('MIN_BALANCE', 'FINANCIAL_FLOW', 'AVERAGE_BALANCE');

-- CreateTable
CREATE TABLE "contracts" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contracts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contract_indicators" (
    "id" TEXT NOT NULL,
    "type" "ContractIndicatorType" NOT NULL,
    "balance" DECIMAL(10,2) NOT NULL,
    "threshold" DECIMAL(10,2) NOT NULL,
    "description" TEXT NOT NULL,
    "lastBalance" JSON[] DEFAULT ARRAY[]::JSON[],
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contract_indicators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scheduled_contract_indicators" (
    "id" TEXT NOT NULL,
    "nextExecutionDate" TIMESTAMP(3) NOT NULL,
    "lastExecutionDate" TIMESTAMP(3),
    "frequency" "FrequencyPattern" NOT NULL DEFAULT 'MONTHLY_30',
    "contractIndicatorId" TEXT NOT NULL,
    "contractId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "scheduled_contract_indicators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "contractId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "scheduled_contract_indicators_contractIndicatorId_key" ON "scheduled_contract_indicators"("contractIndicatorId");

-- CreateIndex
CREATE UNIQUE INDEX "customers_userName_key" ON "customers"("userName");

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contract_indicators" ADD CONSTRAINT "contract_indicators_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scheduled_contract_indicators" ADD CONSTRAINT "scheduled_contract_indicators_contractIndicatorId_fkey" FOREIGN KEY ("contractIndicatorId") REFERENCES "contract_indicators"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scheduled_contract_indicators" ADD CONSTRAINT "scheduled_contract_indicators_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "contracts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scheduled_contract_indicators" ADD CONSTRAINT "scheduled_contract_indicators_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "contracts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
