-- CreateTable
CREATE TABLE "Volunteer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "institutionId" INTEGER NOT NULL,

    CONSTRAINT "Volunteer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Volunteer" ADD CONSTRAINT "Volunteer_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
