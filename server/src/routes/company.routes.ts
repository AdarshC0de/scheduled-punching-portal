import { Router } from "express";
import {
    createCompany,
    getAllCompanies,
    getCompanyById,
} from "../controllers/company.controller";
import { validate } from "../middlewares/validate.middleware";
import { createCompanySchema } from "../validators/company.validator";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.use(authenticate);

router.post("/", validate(createCompanySchema), createCompany);

router.get("/", getAllCompanies);

router.get("/:companyId", getCompanyById);

export default router;