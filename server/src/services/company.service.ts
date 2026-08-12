import {
    createCompany,
    deactivateCompany,
    findAllCompanies, 
    findCompanyByCode,
    findCompanyById,
    restoreCompany,
    updateCompany,
} from "../repositories/company.repository";
import { hasActivePlantsByCompany } from "../repositories/plant.repository";
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

export const updateCompanyService = async (
    companyId: string,
    data: { name?: string; code?: string }
) => {
    const company = await findCompanyById(companyId);

    if (!company) {
        throw new ApiError(404, "Company not found");
    }

    if (!company.isActive) {
        throw new ApiError(40, "Company is inactive!")
    }

    const code = data.code?.trim().toUpperCase();

    if (code) {
        const companyWithCode = await findCompanyByCode(code);

        if (companyWithCode && companyWithCode.id !== companyId) {
            throw new ApiError(409, "A company with this code already exists!")
        }
    }

    return updateCompany(companyId, {
        ...data,
        ...(code && { code }),
    });
};

export const deleteCompanyService = async (companyId: string) => {
    const company = await findCompanyById(companyId);

    if (!company) {
        throw new ApiError(404, "Company not found!")
    }

    if (!company.isActive) {
        throw new ApiError(409, "Company is inactive!")
    }

    const activePlant = await hasActivePlantsByCompany(companyId);

    if (activePlant) {
        throw new ApiError(
            409, "Company cannot be deleted while it has active plants!"
        );
    }

    return deactivateCompany(companyId);
};

export const restoreCompanyService = async (companyId: string ) => {
    const company = await findCompanyById(companyId);

    if (!company) {
        throw new ApiError(404, "Company not found!");
    }

    if (company.isActive) {
        throw new ApiError(400, "Company is already active!");
    }

    return restoreCompany(companyId);
}