import prisma from "../lib/prisma";

export const findUserByEmail = async (email: string) => {
    return prisma.user.findUnique({
        where: { email},
        include: { role: true },
    });
};

export const findUserById = async (userId: string) => {
    return prisma.user.findUnique({
        where: { id: userId },
        include: { role: true },
    });
};

export const updateLastLogin = async (userId: string) => {
    return prisma.user.update({
        where: { id: userId },
        data: { lastLogin: new Date() },
    });
};