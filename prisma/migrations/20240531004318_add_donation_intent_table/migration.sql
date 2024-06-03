-- CreateTable
CREATE TABLE "DonationIntent" (
    "id" SERIAL NOT NULL,
    "donorId" INTEGER NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "institutionId" INTEGER,
    "projectId" INTEGER,
    "checkoutUrl" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,

    CONSTRAINT "DonationIntent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DonationIntent" ADD CONSTRAINT "DonationIntent_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "Donnor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DonationIntent" ADD CONSTRAINT "DonationIntent_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DonationIntent" ADD CONSTRAINT "DonationIntent_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
