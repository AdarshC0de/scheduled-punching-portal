import multer from "multer";
import { RequestHandler } from "express";
import { ApiError } from "../utils/ApiError";

const storage = multer.memoryStorage();

export const uploadFile = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024,
        files: 1,
    },
    fileFilter: (_req, file, callback) => {
        const allowedExtensions = [".csv", ".xls", ".xlsx"];
        const extension = file.originalname
            .toLowerCase()
            .slice(file.originalname.lastIndexOf("."));

        if (!allowedExtensions.includes(extension)) {
            return callback(new ApiError(400, "Only CSV, XLS, and XLSX files are allowed."));
        }

        callback(null, true);
    },
});

export const receiveUpload: RequestHandler = (req, res, next) => {
    uploadFile.single("file")(req, res, (error) => {
        if (!error) {
            return next();
        }

        if (error instanceof multer.MulterError) {
            return next(new ApiError(400, error.message));
        }

        return next(error);
    });
};
