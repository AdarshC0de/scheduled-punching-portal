import { Router } from "express";
import {
    createPlant,
    getPlantById,
    getPlantsByCompany,    
} from "../controllers/plant.controller"
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { createPlantSchema } from "../validators/plant.validator";

const router = Router();

router.post(
    "/",
    authenticate, 
    validate(createPlantSchema),
    createPlant
);

router.get(
    "/company/:companyId",
    authenticate,
    getPlantsByCompany
);

router.get(
    "/:plantId",
    authenticate,
    getPlantById
);

export default router;