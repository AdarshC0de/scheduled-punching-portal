import crypto from "crypto";
import path from "path";
import XLSX from "xlsx";

export interface ParsedRow {
    [key: string]: unknown;
}

export const parseUploadedFile = (
    buffer: Buffer,
    filename: string
): ParsedRow[] => {
    const extension = path.extname(filename).toLowerCase();

    if (![".csv", ".xls", ".xlsx"].includes(extension)) {
        throw new Error("Only CSV, XLS, and XLSX files are supported.");
    }

    const workbook = XLSX.read(buffer, {
        type: "buffer",
        raw: false,
    });
    const sheetName = workbook.SheetNames[0];

    if (!sheetName) {
        throw new Error("Uploaded file contains no sheets.");
    }

    const worksheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json<ParsedRow>(worksheet, {
        defval: null,
        raw: false,
    });

    return rows;
};

export const generateRowHash = (
    plantId: string,
    row: ParsedRow
): string => {
    const normalized = JSON.stringify(
        Object.keys(row)
            .sort((left, right) => left.trim().localeCompare(right.trim()))
            .reduce<Record<string, unknown>>((result, key) => {
                result[key.trim().toLowerCase()] = row[key];
                return result;
            }, {})
    );

    return crypto
        .createHash("sha256")
        .update(`${plantId}:${normalized}`)
        .digest("hex");
}
