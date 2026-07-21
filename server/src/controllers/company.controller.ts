import { Request, Response } from "express";
import {
    createCompanyService,
    getAllCompaniesService,
    getCompanyByIdService,
} from "../services/company.service";
import { success } from "zod";

export const createCompany = async (req: Request, res: Response) => {
    const { name, code } = req.body;
    
    const company = await createCompanyService(name, code);

    return res.status(201).json({
        success: true,
        message: "Company created successfully",
        data: company,
    });
};

export const getAllCompanies = async (_req: Request, res: Response) => {
    const companies = await getAllCompaniesService();

    return res.status(200).json({
        success: true,
        message: "Comapnies fetched successfully",
        data: companies,
    });
};

export const getCompanyById = async (req: Request, res: Response) => {
    const { companyId } = req.params;

    const company = await getCompanyByIdService(companyId);

    return res.status(200).json({
        success: true,
        message: "Company fetched successfully",
        data: company,
    });
};