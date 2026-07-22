import {
    createCompany,
    findAllCompanies, 
    findCompanyByCode,
    findCompanyById,
} from "../repositories/company.repository";
import { ApiError } from "../utils/ApiError";

export const createCompanyService = async (name: string, code: string) => {
    const existingCompany = await findCompanyByCode(code);

    if (existingCompany) {
        throw new ApiError(409, "A company with this code already exists!");
    }

    return createCompany(name, code);
};

export const getAllCompaniesService = async () => {
    return findAllCompanies();
};

export const getCompanyByIdService = async (companyId: string) => {
    const company = await findCompanyById(companyId);

    if(!company) {
        throw new ApiError(404, "Company not found!");
    }

    return company;
};

export const getCompanyByCodeService = async (code: string) => {
    const company = await findCompanyByCode(code);

    if (!company) {
        throw new ApiError(404, "Company not found!");
    }

    return company;
};
