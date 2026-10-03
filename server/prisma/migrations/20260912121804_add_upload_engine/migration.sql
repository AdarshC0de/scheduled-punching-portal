-- CreateEnum
CREATE TYPE "public"."UploadSource" AS ENUM ('FILE', 'MANUAL');

-- CreateEnum
CREATE TYPE "public"."UploadFileType" AS ENUM ('CSV', 'XLS', 'XLSX', 'MANUAL');

-- CreateEnum
CREATE TYPE "public"."UploadStatus" AS ENUM ('PREVIEW', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "public"."Upload" (
    "id" TEXT NOT NULL,
    "plantId" TEXT NOT NULL,
    "uploadedById" TEXT NOT NULL,
    "originalFilename" TEXT,
    "filePath" TEXT,
    "source" "public"."UploadSource" NOT NULL,
    "fileType" "public"."UploadFileType" NOT NULL,
    "status" "public"."UploadStatus" NOT NULL DEFAULT 'PREVIEW',
    "totalRows" INTEGER NOT NULL DEFAULT 0,
    "validRows" INTEGER NOT NULL DEFAULT 0,
    "invalidRows" INTEGER NOT NULL DEFAULT 0,
    "duplicateRows" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Upload_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UploadRecord" (
    "id" TEXT NOT NULL,
    "uploadId" TEXT NOT NULL,
    "plantId" TEXT NOT NULL,
    "rowNumber" INTEGER NOT NULL,
    "data" JSONB NOT NULL,
    "rowHash" TEXT NOT NULL,
    "isValid" BOOLEAN NOT NULL DEFAULT true,
    "isDuplicate" BOOLEAN NOT NULL DEFAULT false,
    "validationErrors" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UploadRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Upload_plantId_idx" ON "public"."Upload"("plantId");

-- CreateIndex
CREATE INDEX "Upload_uploadedById_idx" ON "public"."Upload"("uploadedById");

-- CreateIndex
CREATE INDEX "UploadRecord_uploadId_idx" ON "public"."UploadRecord"("uploadId");

-- CreateIndex
CREATE INDEX "UploadRecord_plantId_idx" ON "public"."UploadRecord"("plantId");

-- CreateIndex
CREATE INDEX "UploadRecord_rowHash_idx" ON "public"."UploadRecord"("rowHash");

-- CreateIndex
CREATE INDEX "UploadRecord_plantId_rowHash_idx" ON "public"."UploadRecord"("plantId", "rowHash");

-- AddForeignKey
ALTER TABLE "public"."Upload" ADD CONSTRAINT "Upload_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "public"."Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Upload" ADD CONSTRAINT "Upload_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UploadRecord" ADD CONSTRAINT "UploadRecord_uploadId_fkey" FOREIGN KEY ("uploadId") REFERENCES "public"."Upload"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UploadRecord" ADD CONSTRAINT "UploadRecord_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "public"."Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
