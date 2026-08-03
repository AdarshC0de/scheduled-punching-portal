import {
    createPlant, 
    findPlantByCode,
    findPlantByCompany,
    findPlantById,
} from "../repositories/plant.repository"
import { findCompanyById } from "../repositories/company.repository"
import { ApiError } from "../utils/ApiError"

export const createPlantService = async (
    name:string,
    code: string,
    companyId: string,
) => {
    const company = await findCompanyById(companyId);

    if (!company) {
        throw new ApiError(404, "Company not found!");
    }

    const normalizedCode = code.trim().toUpperCase();

    const existingPlant = await findPlantByCode(normalizedCode);

    if (existingPlant) {
        throw new ApiError (409, "A plant with this code already exists!");
    }

    return createPlant(name, normalizedCode, companyId);
};

export const getPlantsByCompanyService = async (companyId: string) => {
    const company = await findCompanyById(companyId);

    if (!company) {
        throw new ApiError(404, "Company not found!")
    }

    return findPlantByCompany(companyId);
};

export const getPlantByIdService = async (plantId: string) => {
    const plant = await findPlantById(plantId);

    if (!plant) {
        throw new ApiError(404, "Plant not found!");
    }

    return plant;
}