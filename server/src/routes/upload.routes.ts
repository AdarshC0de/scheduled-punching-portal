import { Router } from "express";
import {
    completeUpload,
    createManualUploadPreview,
    createUploadPreview,
    getUploadPreview,
} from "../controllers/upload.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { receiveUpload } from "../middlewares/upload.middleware";
import { validate } from "../middlewares/validate.middleware";
import { createManualUploadSchema } from "../validators/upload.validator";

const router = Router();
router.use(authenticate);
router.post("/plants/:plantId/preview", receiveUpload, createUploadPreview);
router.post(
    "/plants/:plantId/manual",
    validate(createManualUploadSchema),
    createManualUploadPreview
);
router.get("/:uploadId", getUploadPreview);
router.post("/:uploadId/complete", completeUpload);

export default router;
