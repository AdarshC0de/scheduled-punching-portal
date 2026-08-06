import { NextFunction, Request, Response } from "express";
import {
    createPlantService,
    getPlantByIdService,
    getPlantsByCompanyService,
    updatePlantService,
    deletePlantService,
} from "../services/plant.service";
import { ApiError } from "../utils/ApiError";

export const createPlant = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name, code, companyId } = req.body;

        const plant = await createPlantService(name, code, companyId)

        return res.status(201).json({
            success: true,
            message: "Plant created successfully!",
            data: plant,
        });
    } catch (error) {
        next(error);
    }
};

export const getPlantsByCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { companyId } = req.params;

    if (typeof companyId !== "string") {
        throw new ApiError(400, "Invalid Company ID!")
    }

    const plants = await getPlantsByCompanyService(companyId);

    return res.status(200).json({
      success: true,
      message: "Plants fetched successfully",
      data: plants,
    });
  } catch (error) {
    next(error);
  }
};

export const getPlantById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { plantId } = req.params;

    if (typeof plantId !== "string") {
        throw new ApiError(400, "Invalid Plant ID!")
    }

    const plant = await getPlantByIdService(plantId);

    return res.status(200).json({
      success: true,
      message: "Plant fetched successfully",
      data: plant,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePlant = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { plantId } = req.params;

        if (typeof plantId !== "string") {
        throw new ApiError(400, "Invalid Plant ID");
        }

        const Plant = await updatePlantService(plantId, req.body);

        return res.status(200).json({
        success: true,
        message: "Plant updated successfully",
        data: Plant,
        });
    } catch (error) {
        next(error);
    }
};

export const deletePlant = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { plantId } = req.params;

        if (typeof plantId !== "string") {
            throw new ApiError(400, "Invalid Plant ID!")
        }

        await deletePlantService(plantId);

        return res.status(200).json({
            success: true,
            message: "Plant deleted successfully!",
        });
    } catch (error) {
        next(error);
    }
};