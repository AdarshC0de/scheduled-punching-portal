import { Router } from "express";
import healthRoutes from "./health.routes";
import authRoutes from "./auth.routes";
import companyRoutes from "./company.routes"
import plantRoutes from "./plant.routes"

const router = Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/companies", companyRoutes);
router.use("/plants", plantRoutes);

export default router;