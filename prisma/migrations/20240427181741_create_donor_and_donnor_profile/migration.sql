-- CreateTable
CREATE TABLE "Donnor" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Donnor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DonnorProfile" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "display_name" TEXT NOT NULL,
    "avatar" TEXT,
    "url" TEXT,
    "uri" TEXT,
    "following_count" INTEGER NOT NULL DEFAULT 0,
    "followers_count" INTEGER NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "DonnorProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Donnor_email_key" ON "Donnor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DonnorProfile_userId_key" ON "DonnorProfile"("userId");

-- AddForeignKey
ALTER TABLE "DonnorProfile" ADD CONSTRAINT "DonnorProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Donnor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
