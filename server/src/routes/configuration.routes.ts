import { Router } from "express";

import {
    getConfiguration,

    updateGeneralConfiguration,
    updateEmailConfiguration,
    updateSFTPConfiguration,
    updateFilenameConfiguration,
    updateExcelConfiguration,
    updateRevisionConfiguration,
} from "../controllers/configuration.controller";

import { authenticate } from "../middlewares/auth.middleware";

import { validate } from "../middlewares/validate.middleware";

import {
    updateGeneralConfigurationSchema,
    updateEmailConfigurationSchema,
    updateSFTPConfigurationSchema,
    updateFilenameConfigurationSchema,
    updateExcelConfigurationSchema,
    updateRevisionConfigurationSchema,
} from "../validators/configuration.validator";


const router = Router();


// All configuration routes require authentication.
router.use(authenticate);

router.get(
    "/plant/:plantId",
    getConfiguration
);


router.patch(
    "/plant/:plantId/general",
    validate(updateGeneralConfigurationSchema),
    updateGeneralConfiguration
);


router.patch(
    "/plant/:plantId/email",
    validate(updateEmailConfigurationSchema),
    updateEmailConfiguration
);


router.patch(
    "/plant/:plantId/sftp",
    validate(updateSFTPConfigurationSchema),
    updateSFTPConfiguration
);


router.patch(
    "/plant/:plantId/filename",
    validate(updateFilenameConfigurationSchema),
    updateFilenameConfiguration
);


router.patch(
    "/plant/:plantId/excel",
    validate(updateExcelConfigurationSchema),
    updateExcelConfiguration
);


router.patch(
    "/plant/:plantId/revision",
    validate(updateRevisionConfigurationSchema),
    updateRevisionConfiguration
);


export default router;