import { NextFunction, Request, Response } from "express";
import {
    createPlantService,
    getPlantByIdService,
    getPlantsByCompanyService,
    updatePlantService,
    deletePlantService,
    restorePlantService,
} from "../services/plant.service";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { ca } from "zod/v4/locales";

export const createPlant = async (
    req: Request<{ companyId: string}>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name, code } = req.body;
        const { companyId } = req.params;

        if (!companyId) {
            throw new ApiError(400, "Company Id is required!");
        }

        const plant = await createPlantService(name, code, companyId)

        return res.status(201).json(new ApiResponse(
            true, 
            "Plant Created Successfully!",
            plant
        ));
    } catch (error) {
        next(error);
    }
};

export const getPlantsByCompany = async (
  req: Request<{ companyId: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { companyId } = req.params;

    const plants = await getPlantsByCompanyService(companyId);

    return res.status(200).json(new ApiResponse(
        true, 
        "Plants fetched successfully!",
        plants
    ));
  } catch (error) {
    next(error);
  }
};

export const getPlantById = async (
  req: Request<{ plantId: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { plantId } = req.params;

    const plant = await getPlantByIdService(plantId);

    return res.status(200).json(new ApiResponse(
        true, 
        "Plant fetched successfully!",
        plant
    ));
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

        return res.status(200).json(new ApiResponse(
            true, 
            "Plant updated successfully!",
            Plant,
        )
        );
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

        return res.status(200).json(new ApiResponse(
            true, 
            "Plant deleted succesfully",
            
        ));
    } catch (error) {
        next(error);
    }
};

export const restorePlant = async (
    req: Request<{ plantId: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const {plantId} = req.params;

        if (!plantId) {
            throw new ApiError(400, "Plant ID is required!")
        }

        const plant = await restorePlantService(plantId);

        return res.status(200).json(
            new ApiResponse(
                true, 
                "Plant restored succesfully!",
                plant
            )
        );
    } catch (error) {
        next (error);
    }
};