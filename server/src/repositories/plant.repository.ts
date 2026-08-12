import prisma from "../lib/prisma";

export const createPlant = async (
    name: string,
    code: string,
    companyId: string
) => {
    return prisma.plant.create({
        data: {
            name, 
            code,
            companyId,
        },
    });
};

export const findPlantById = async (plantId: string) => {
    return prisma.plant.findUnique({
        where: {
            id: plantId,
        },
        include: {
            company: true,
        },
    });
};

export const findPlantByCompany = async (companyId: string) => {
    return prisma.plant.findMany ({
        where: {
            companyId,
            isActive: true,
        },
        orderBy: {
            name: "asc",
        },
     });
};

export const findPlantByCode = async (companyId: string, code: string) => {
  return prisma.plant.findFirst({
    where: {
      code,
      companyId,
    },
  });
};

export const updatePlant = async (
    plantId: string,
    data: { name?: string; code?: string }
) => {
    return prisma.plant.update({
        where: { id: plantId },
        data,
    });
};

export const deactivatePlant = async (plantId: string) => {
    return prisma.plant.update({
        where: { id: plantId },
        data: { isActive: false },
    });
};

export const restorePlant = async (plantId: string) => {
    return prisma.plant.update({
        where: {
            id: plantId,
        },
        data: {
            isActive: true,
        },
    });
};

export const hasActivePlantsByCompany = async (companyId: string) => {
    return prisma.plant.findFirst({
        where: {
            companyId,
            isActive: true,
        },
    });
};