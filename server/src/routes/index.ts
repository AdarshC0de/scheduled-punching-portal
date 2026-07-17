import { Router } from "express";
import healthRoutes from "./health.routes";
import authRoutes from "./auth.routes";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.use("/health", healthRoutes);
router.use("/auth", authenticate, authRoutes);

export default router;