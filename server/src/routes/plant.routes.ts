import { Router } from "express";
import {
    createPlant,
    deletePlant,
    getPlantById,
    getPlantsByCompany,  
    updatePlant  
} from "../controllers/plant.controller"
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { createPlantSchema, updatePlantSchema } from "../validators/plant.validator";

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

router.patch(
    ":/plantId",
    authenticate,
    validate(updatePlantSchema),
    updatePlant,
)

router.delete(
    "/:plantId",
    authenticate,
    deletePlant
)

export default router;