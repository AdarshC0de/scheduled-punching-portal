/*
  Warnings:

  - You are about to drop the `SFTPConfiguration` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."SFTPConfiguration" DROP CONSTRAINT "SFTPConfiguration_configurationId_fkey";

-- DropTable
DROP TABLE "public"."SFTPConfiguration";

-- CreateTable
CREATE TABLE "public"."SftpConfiguration" (
    "id" TEXT NOT NULL,
    "configurationId" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "host" TEXT,
    "port" INTEGER,
    "username" TEXT,
    "authenticationType" "public"."SFTPAuthenticationType" NOT NULL DEFAULT 'PASSWORD',
    "password" TEXT,
    "privateKey" TEXT,
    "remotePath" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SftpConfiguration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SftpConfiguration_configurationId_key" ON "public"."SftpConfiguration"("configurationId");

-- AddForeignKey
ALTER TABLE "public"."SftpConfiguration" ADD CONSTRAINT "SftpConfiguration_configurationId_fkey" FOREIGN KEY ("configurationId") REFERENCES "public"."Configuration"("id") ON DELETE CASCADE ON UPDATE CASCADE;
