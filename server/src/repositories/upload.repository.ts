import { Prisma } from "@prisma/client";
import prisma from "../lib/prisma";
import { ParsedRow } from "../utils/upload.util";

export const findExistingRowHashes = async (plantId: string, rowHashes: string[]) => {
    if (rowHashes.length === 0) return [];

    return prisma.uploadRecord.findMany({
        where: {
            plantId,
            rowHash: { in: rowHashes },
            upload: { is: { status: "COMPLETED" } },
        },
        select: { rowHash: true },
    });
};

export const createUploadPreview = async (input: {
    plantId: string;
    uploadedById: string;
    originalFilename?: string;
    source: "FILE" | "MANUAL";
    fileType: "CSV" | "XLS" | "XLSX" | "MANUAL";
    rows: {
        rowNumber: number;
        data: ParsedRow;
        rowHash: string;
        isDuplicate: boolean;
        validationErrors: string[];
    }[];
}) => {
    const duplicateRows = input.rows.filter((row) => row.isDuplicate).length;
    const invalidRows = input.rows.filter((row) => !row.isDuplicate && row.validationErrors.length > 0).length;
    const validRows = input.rows.length - duplicateRows - invalidRows;

    return prisma.upload.create({
        data: {
            plantId: input.plantId,
            uploadedById: input.uploadedById,
            originalFilename: input.originalFilename ?? null,
            source: input.source,
            fileType: input.fileType,
            status: "PREVIEW",
            totalRows: input.rows.length,
            validRows,
            invalidRows,
            duplicateRows,
            records: {
                create: input.rows.map((row) => {
                    const validationErrors = [
                        ...row.validationErrors,
                        ...(row.isDuplicate ? ["Duplicate row found in this file or a previous upload for this plant."] : []),
                    ];
                    const isValid = validationErrors.length === 0;

                    return {
                        plantId: input.plantId,
                        rowNumber: row.rowNumber,
                        data: row.data as Prisma.InputJsonValue,
                        rowHash: row.rowHash,
                        isDuplicate: row.isDuplicate,
                        isValid,
                        validationErrors: validationErrors as Prisma.InputJsonValue,
                    };
                }),
            },
        },
        include: {
            records: { orderBy: { rowNumber: "asc" } },
        },
    });
};

export const findUploadById = async (uploadId: string) => {
    return prisma.upload.findUnique({
        where: { id: uploadId },
        include: {
            records: { orderBy: { rowNumber: "asc" } },
        },
    });
};

export const completeUploadPreview = async (uploadId: string) => {
    const result = await prisma.upload.updateMany({
        where: {
            id: uploadId,
            status: "PREVIEW",
            invalidRows: 0,
            duplicateRows: 0,
        },
        data: { status: "COMPLETED" },
    });

    if (result.count === 0) return null;
    return findUploadById(uploadId);
};
