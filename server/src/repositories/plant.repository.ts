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
        },
        orderBy: {
            name: "asc",
        },
     });
};

export const findPlantByCode = async (code: string) => {
  return prisma.plant.findFirst({
    where: {
      code,
    },
  });
};