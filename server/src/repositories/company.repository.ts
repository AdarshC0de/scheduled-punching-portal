import prisma from "../lib/prisma";

export const createCompany = async (name: string, code: string) => {
    return prisma.company.create({
        data: {
            name, 
            code,
        },
    });
};

export const findAllCompanies = async () => {
    return prisma.company.findMany({
        orderBy: {
            name: "asc",
        },
    });
};

export const findCompanyById = async (companyId: string) => {
    return prisma.company.findUnique({
        where: {
            id: companyId,
        },
    });
};

export const findCompanyByCode = async (code: string) => {
    return prisma.company.findUnique({
        where: {
            code,
        },
    });
};

