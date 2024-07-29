-- CreateTable
CREATE TABLE "Partner" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "institutionId" INTEGER NOT NULL,

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Partner" ADD CONSTRAINT "Partner_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
