const test = require("node:test");
const assert = require("node:assert/strict");
const { validateUploadRows } = require("../dist/utils/upload.validation.js");

test("accepts a non-empty row with all configured source columns", () => {
    const [row] = validateUploadRows(
        [{ EmployeeID: "E-17", Date: "2026-09-30" }],
        ["employeeid", " Date "],
        ["hash-1"],
        new Set()
    );

    assert.equal(row.isDuplicate, false);
    assert.deepEqual(row.validationErrors, []);
    assert.equal(row.rowNumber, 2);
});

test("marks empty rows invalid", () => {
    const [row] = validateUploadRows([{}], [], ["hash-1"], new Set());

    assert.match(row.validationErrors[0], /empty/i);
});

test("reports configured columns that are absent from the input", () => {
    const [row] = validateUploadRows(
        [{ EmployeeID: "E-17" }],
        ["EmployeeID", "PunchTime"],
        ["hash-1"],
        new Set()
    );

    assert.equal(row.validationErrors.length, 1);
    assert.match(row.validationErrors[0], /PunchTime/);
});

test("detects duplicate rows within a batch and in completed data", () => {
    const rows = validateUploadRows(
        [{ id: "A" }, { id: "A" }, { id: "B" }],
        [],
        ["same", "same", "existing"],
        new Set(["existing"])
    );

    assert.deepEqual(rows.map((row) => row.isDuplicate), [false, true, true]);
});

test("uses one-based row numbers for manual entries", () => {
    const [row] = validateUploadRows(
        [{ id: "A" }],
        [],
        ["hash-1"],
        new Set(),
        1
    );

    assert.equal(row.rowNumber, 1);
});
