import { Router } from "express";
import {
    createPlant,
    deletePlant,
    getPlantById,
    getPlantsByCompany,  
    restorePlant,  
    updatePlant  
} from "../controllers/plant.controller"
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { createPlantSchema, updatePlantSchema } from "../validators/plant.validator";

const router = Router();

router.post(
    "/company/:companyId",
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
    "/:plantId",
    authenticate,
    validate(updatePlantSchema),
    updatePlant,
)

router.delete(
    "/:plantId",
    authenticate,
    deletePlant
)

router.patch(
    "/:plantId/restore",
    authenticate,
    restorePlant
)

export default router;