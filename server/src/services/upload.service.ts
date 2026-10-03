import path from "path";
import { findExcelMappingsByPlantId } from "../repositories/configuration.repository";
import { findPlantById } from "../repositories/plant.repository";
import {
    completeUploadPreview,
    createUploadPreview,
    findExistingRowHashes,
    findUploadById,
} from "../repositories/upload.repository";
import { ApiError } from "../utils/ApiError";
import { validateUploadRows } from "../utils/upload.validation";
import { generateRowHash, ParsedRow, parseUploadedFile } from "../utils/upload.util";

const fileTypeFor = (filename: string): "CSV" | "XLS" | "XLSX" => {
    switch (path.extname(filename).toLowerCase()) {
        case ".csv": return "CSV";
        case ".xls": return "XLS";
        case ".xlsx": return "XLSX";
        default: throw new ApiError(400, "Only CSV, XLS, and XLSX files are supported.");
    }
};

const createPreviewForRows = async (input: {
    plantId: string;
    uploadedById: string;
    rows: ParsedRow[];
    source: "FILE" | "MANUAL";
    fileType: "CSV" | "XLS" | "XLSX" | "MANUAL";
    originalFilename?: string;
    firstRowNumber: number;
}) => {
    const plant = await findPlantById(input.plantId);
    if (!plant) throw new ApiError(404, "Plant not found.");
    if (!plant.isActive) throw new ApiError(409, "Cannot upload data for an inactive plant.");

    const mappings = await findExcelMappingsByPlantId(input.plantId);
    const rowHashes = input.rows.map((row) => generateRowHash(input.plantId, row));
    const existingHashes = new Set(
        (await findExistingRowHashes(input.plantId, [...new Set(rowHashes)])).map(({ rowHash }) => rowHash)
    );
    const rows = validateUploadRows(
        input.rows,
        mappings.map(({ sourceColumn }) => sourceColumn),
        rowHashes,
        existingHashes,
        input.firstRowNumber
    );

    return createUploadPreview({
        plantId: input.plantId,
        uploadedById: input.uploadedById,
        source: input.source,
        fileType: input.fileType,
        originalFilename: input.originalFilename,
        rows,
    });
};

export const createUploadPreviewService = async (
    plantId: string,
    uploadedById: string,
    file?: Express.Multer.File
) => {
    if (!file) throw new ApiError(400, "A file is required in the 'file' field.");

    let parsedRows: ParsedRow[];
    try {
        parsedRows = parseUploadedFile(file.buffer, file.originalname);
    } catch (error) {
        throw new ApiError(400, error instanceof Error ? error.message : "Unable to parse uploaded file.");
    }

    if (parsedRows.length === 0) {
        throw new ApiError(400, "The uploaded file has no data rows.");
    }

    return createPreviewForRows({
        plantId,
        uploadedById,
        rows: parsedRows,
        source: "FILE",
        fileType: fileTypeFor(file.originalname),
        originalFilename: path.basename(file.originalname),
        firstRowNumber: 2,
    });
};

export const createManualUploadPreviewService = async (
    plantId: string,
    uploadedById: string,
    rows: ParsedRow[]
) => {
    if (rows.length === 0) throw new ApiError(400, "At least one manual row is required.");

    return createPreviewForRows({
        plantId,
        uploadedById,
        rows,
        source: "MANUAL",
        fileType: "MANUAL",
        firstRowNumber: 1,
    });
};

export const getUploadPreviewService = async (uploadId: string, requesterId: string) => {
    const upload = await findUploadById(uploadId);
    if (!upload) throw new ApiError(404, "Upload not found.");
    if (upload.uploadedById !== requesterId) throw new ApiError(403, "You cannot view this upload.");
    return upload;
};

export const completeUploadService = async (uploadId: string, requesterId: string) => {
    const upload = await findUploadById(uploadId);
    if (!upload) throw new ApiError(404, "Upload not found.");
    if (upload.uploadedById !== requesterId) throw new ApiError(403, "You cannot complete this upload.");
    if (upload.status !== "PREVIEW") throw new ApiError(409, "Only uploads in preview can be completed.");
    if (upload.invalidRows > 0 || upload.duplicateRows > 0 || upload.validRows !== upload.totalRows) {
        throw new ApiError(409, "Upload contains invalid or duplicate rows and cannot be completed.", {
            totalRows: upload.totalRows,
            validRows: upload.validRows,
            invalidRows: upload.invalidRows,
            duplicateRows: upload.duplicateRows,
        });
    }

    const completed = await completeUploadPreview(uploadId);
    if (!completed) throw new ApiError(409, "Upload state changed before it could be completed.");
    return completed;
};
