-- CreateEnum
CREATE TYPE "public"."EmailRecipientType" AS ENUM ('TO', 'CC', 'BCC');

-- CreateEnum
CREATE TYPE "public"."SFTPAuthenticationType" AS ENUM ('PASSWORD', 'PRIVATE_KEY');

-- CreateTable
CREATE TABLE "public"."Configuration" (
    "id" TEXT NOT NULL,
    "plantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Configuration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."GeneralConfiguration" (
    "id" TEXT NOT NULL,
    "configurationId" TEXT NOT NULL,
    "timezone" TEXT NOT NULL DEFAULT 'Asia/Kolkata',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GeneralConfiguration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EmailConfiguration" (
    "id" TEXT NOT NULL,
    "configurationId" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "smtpHost" TEXT,
    "smtpPort" INTEGER,
    "username" TEXT,
    "password" TEXT,
    "fromEmail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailConfiguration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EmailRecipient" (
    "id" TEXT NOT NULL,
    "emailConfigurationId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "type" "public"."EmailRecipientType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailRecipient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SFTPConfiguration" (
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

    CONSTRAINT "SFTPConfiguration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FilenameConfiguration" (
    "id" TEXT NOT NULL,
    "configurationId" TEXT NOT NULL,
    "template" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FilenameConfiguration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ExcelConfiguration" (
    "id" TEXT NOT NULL,
    "configurationId" TEXT NOT NULL,
    "templateFile" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExcelConfiguration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ExcelColumnMapping" (
    "id" TEXT NOT NULL,
    "excelConfigurationId" TEXT NOT NULL,
    "sourceColumn" TEXT NOT NULL,
    "targetColumn" TEXT NOT NULL,
    "transformation" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExcelColumnMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RevisionConfiguration" (
    "id" TEXT NOT NULL,
    "configurationId" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "format" TEXT NOT NULL DEFAULT 'rev{revision}',
    "startingRevision" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RevisionConfiguration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Configuration_plantId_key" ON "public"."Configuration"("plantId");

-- CreateIndex
CREATE UNIQUE INDEX "GeneralConfiguration_configurationId_key" ON "public"."GeneralConfiguration"("configurationId");

-- CreateIndex
CREATE UNIQUE INDEX "EmailConfiguration_configurationId_key" ON "public"."EmailConfiguration"("configurationId");

-- CreateIndex
CREATE INDEX "EmailRecipient_emailConfigurationId_idx" ON "public"."EmailRecipient"("emailConfigurationId");

-- CreateIndex
CREATE UNIQUE INDEX "SFTPConfiguration_configurationId_key" ON "public"."SFTPConfiguration"("configurationId");

-- CreateIndex
CREATE UNIQUE INDEX "FilenameConfiguration_configurationId_key" ON "public"."FilenameConfiguration"("configurationId");

-- CreateIndex
CREATE UNIQUE INDEX "ExcelConfiguration_configurationId_key" ON "public"."ExcelConfiguration"("configurationId");

-- CreateIndex
CREATE INDEX "ExcelColumnMapping_excelConfigurationId_idx" ON "public"."ExcelColumnMapping"("excelConfigurationId");

-- CreateIndex
CREATE UNIQUE INDEX "RevisionConfiguration_configurationId_key" ON "public"."RevisionConfiguration"("configurationId");

-- AddForeignKey
ALTER TABLE "public"."Configuration" ADD CONSTRAINT "Configuration_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "public"."Plant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GeneralConfiguration" ADD CONSTRAINT "GeneralConfiguration_configurationId_fkey" FOREIGN KEY ("configurationId") REFERENCES "public"."Configuration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EmailConfiguration" ADD CONSTRAINT "EmailConfiguration_configurationId_fkey" FOREIGN KEY ("configurationId") REFERENCES "public"."Configuration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EmailRecipient" ADD CONSTRAINT "EmailRecipient_emailConfigurationId_fkey" FOREIGN KEY ("emailConfigurationId") REFERENCES "public"."EmailConfiguration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SFTPConfiguration" ADD CONSTRAINT "SFTPConfiguration_configurationId_fkey" FOREIGN KEY ("configurationId") REFERENCES "public"."Configuration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FilenameConfiguration" ADD CONSTRAINT "FilenameConfiguration_configurationId_fkey" FOREIGN KEY ("configurationId") REFERENCES "public"."Configuration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ExcelConfiguration" ADD CONSTRAINT "ExcelConfiguration_configurationId_fkey" FOREIGN KEY ("configurationId") REFERENCES "public"."Configuration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ExcelColumnMapping" ADD CONSTRAINT "ExcelColumnMapping_excelConfigurationId_fkey" FOREIGN KEY ("excelConfigurationId") REFERENCES "public"."ExcelConfiguration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RevisionConfiguration" ADD CONSTRAINT "RevisionConfiguration_configurationId_fkey" FOREIGN KEY ("configurationId") REFERENCES "public"."Configuration"("id") ON DELETE CASCADE ON UPDATE CASCADE;
