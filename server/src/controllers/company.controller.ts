import { NextFunction, Request, Response } from "express";
import {
    createCompanyService,
    deleteCompanyService,
    getAllCompaniesService,
    getCompanyByIdService,
    restoreCompanyService,
    updateCompanyService,
} from "../services/company.service";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { success } from "zod";


export const createCompany = async (req: Request, res: Response) => {
    const { name, code } = req.body;
    
    const company = await createCompanyService(name, code);

    return res.status(201).json(new ApiResponse (true, "Company created succesfully!", company));
};

export const getAllCompanies = async (_req: Request, res: Response) => {
    const companies = await getAllCompaniesService();

    return res.status(200).json(new ApiResponse (true, "Companies fetched succesfully!", companies));
};

export const getCompanyById = async (req: Request, res: Response) => {
    const { companyId } = req.params;

    if (typeof companyId !== "string") {
            throw new ApiError(400, "Invalid Plant ID!")
        }

    const company = await getCompanyByIdService(companyId);

    return res.status(200).json(new ApiResponse (true, "Company fetched succefully!", company));
};

export const updateCompany = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { companyId } = req.params;

        if (typeof companyId !== "string") {
        throw new ApiError(400, "Invalid company ID");
        }

        const company = await updateCompanyService(companyId, req.body);

        return res.status(200).json({
        success: true,
        message: "Company updated successfully",
        data: company,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteCompany = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { companyId } = req.params;

        if (typeof companyId !== "string") {
            throw new ApiError(400, "Invalid company ID!")
        }

        await deleteCompanyService(companyId);

        return res.status(200).json({
            success: true,
            message: "Company deleted successfully!",
        });
    } catch (error) {
        next(error);
    }
};

export const restoreCompany = async (
    req: Request<{ companyId: string }>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { companyId } = req.params;

        if(!companyId) {
            throw new ApiError(400, "Company is requried!");
        }

        const company = await restoreCompanyService(companyId);

        return res.status(200).json(
            new ApiResponse(
                true,
                "Company restored succesfully!",
                company
            )
        );
    } catch (error) {
        next(error);
    }
};