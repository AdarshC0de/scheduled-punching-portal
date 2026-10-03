import { Router } from "express";
import {
    createCompany,
    deleteCompany,
    getAllCompanies,
    getCompanyById,
    updateCompany,
} from "../controllers/company.controller";
import { validate } from "../middlewares/validate.middleware";
import { createCompanySchema, updateCompanySchema } from "../validators/company.validator";
import { authenticate } from "../middlewares/auth.middleware";
import { restoreCompany } from "../repositories/company.repository";

const router = Router();

router.use(authenticate);

router.post("/", validate(createCompanySchema), createCompany);

router.get("/", getAllCompanies);

router.get("/:companyId", getCompanyById);

router.patch(
    "/:companyId",
    authenticate,
    validate(updateCompanySchema),
    updateCompany, 
);

router.delete(
    "/:companyId",
    authenticate,
    deleteCompany,
)

router.patch(
    "/:companyId/restore",
    authenticate,
    restoreCompany
);

export default router;