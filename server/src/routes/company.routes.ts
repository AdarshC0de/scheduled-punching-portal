import { Router } from "express";
import {
    createCompany,
    getAllCompanies,
    getCompanyById,
} from "../controllers/company.controller";
import { validate } from "../middlewares/validate.middleware";
import { createCompanySchema } from "../validators/company.validator";

const router = Router();

router.post("/", validate(createCompanySchema), createCompany);

router.get("/", getAllCompanies);

router.get("/:companyId", getCompanyById);

export default router;

