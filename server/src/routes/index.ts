import { Router } from "express";
import healthRoutes from "./health.routes";
import authRoutes from "./auth.routes";
import { authenticate } from "../middlewares/auth.middleware";
import companyRoutes from "./company.routes"

const router = Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/companies", authenticate, companyRoutes)

export default router;