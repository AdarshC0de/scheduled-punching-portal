import { NextFunction, Request, Response } from "express";
import {
    completeUploadService,
    createManualUploadPreviewService,
    createUploadPreviewService,
    getUploadPreviewService,
} from "../services/upload.service";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

export const createUploadPreview = async (
    req: Request<{ plantId: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.user?.userId) throw new ApiError(401, "Authentication required.");
        const upload = await createUploadPreviewService(req.params.plantId, req.user.userId, req.file);
        return res.status(201).json(new ApiResponse(true, "Upload preview created successfully.", upload));
    } catch (error) {
        return next(error);
    }
};

export const getUploadPreview = async (
    req: Request<{ uploadId: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.user?.userId) throw new ApiError(401, "Authentication required.");
        const upload = await getUploadPreviewService(req.params.uploadId, req.user.userId);
        return res.status(200).json(new ApiResponse(true, "Upload preview fetched successfully.", upload));
    } catch (error) {
        return next(error);
    }
};


export const completeUpload = async (
    req: Request<{ uploadId: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.user?.userId) throw new ApiError(401, "Authentication required.");
        const upload = await completeUploadService(req.params.uploadId, req.user.userId);
        return res.status(200).json(new ApiResponse(true, "Upload completed successfully.", upload));
    } catch (error) {
        return next(error);
    }
};


export const createManualUploadPreview = async (
    req: Request<{ plantId: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.user?.userId) throw new ApiError(401, "Authentication required.");
        const upload = await createManualUploadPreviewService(
            req.params.plantId,
            req.user.userId,
            req.body.rows
        );
        return res.status(201).json(new ApiResponse(true, "Manual entry preview created successfully.", upload));
    } catch (error) {
        return next(error);
    }
};
