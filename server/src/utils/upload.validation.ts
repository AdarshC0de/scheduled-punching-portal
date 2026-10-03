import { ParsedRow } from "./upload.util";

const normalizedColumnName = (name: string) => name.trim().toLowerCase();
const hasValue = (value: unknown) =>
    value !== null && value !== undefined && String(value).trim() !== "";

export const validateUploadRows = (
    parsedRows: ParsedRow[],
    mappedSourceColumns: string[],
    rowHashes: string[],
    existingHashes: Set<string>,
    firstRowNumber = 2
) => {
    const seenInFile = new Set<string>();

    return parsedRows.map((data, index) => {
        const rowHash = rowHashes[index];
        const availableColumns = new Set(Object.keys(data).map(normalizedColumnName));
        const validationErrors: string[] = [];

        if (!Object.values(data).some(hasValue)) {
            validationErrors.push("Row is empty.");
        }

        for (const sourceColumn of mappedSourceColumns) {
            if (!availableColumns.has(normalizedColumnName(sourceColumn))) {
                validationErrors.push(`Mapped source column '${sourceColumn}' is missing from the input.`);
            }
        }

        const isDuplicate = existingHashes.has(rowHash) || seenInFile.has(rowHash);
        seenInFile.add(rowHash);

        return {
            rowNumber: index + firstRowNumber,
            data,
            rowHash,
            isDuplicate,
            validationErrors,
        };
    });
};
