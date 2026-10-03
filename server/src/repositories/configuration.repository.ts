import prisma from "../lib/prisma";


// ============================================================
// GET COMPLETE CONFIGURATION
// ============================================================

export const findConfigurationByPlantId = async (
    plantId: string
) => {
    return prisma.configuration.findUnique({
        where: {
            plantId,
        },

        include: {
            general: true,

            email: {
                include: {
                    recipients: true,
                },
            },

            sftp: true,

            filename: true,

            excel: {
                include: {
                    mappings: true,
                },
            },

            revision: true,
        },
    });
};


// ============================================================
// CREATE CONFIGURATION
// ============================================================

export const createConfiguration = async (
    plantId: string
) => {
    return prisma.configuration.create({
        data: {
            plantId,
        },
    });
};


// ============================================================
// GENERAL CONFIGURATION
// ============================================================

export const upsertGeneralConfiguration = async (
    configurationId: string,
    data: {
        timezone?: string;
        isActive?: boolean;
    }
) => {
    return prisma.generalConfiguration.upsert({
        where: {
            configurationId,
        },

        create: {
            configurationId,
            ...data,
        },

        update: {
            ...data,
        },
    });
};


// ============================================================
// EMAIL CONFIGURATION
// ============================================================

export const upsertEmailConfiguration = async (
    configurationId: string,
    data: {
        enabled?: boolean;
        smtpHost?: string;
        smtpPort?: number;
        username?: string;
        password?: string;
        fromEmail?: string;
    }
) => {
    return prisma.emailConfiguration.upsert({
        where: {
            configurationId,
        },

        create: {
            configurationId,
            ...data,
        },

        update: {
            ...data,
        },
    });
};


// ============================================================
// EMAIL RECIPIENTS
// ============================================================

export const replaceEmailRecipients = async (
    emailConfigurationId: string,
    recipients: {
        email: string;
        type: "TO" | "CC" | "BCC";
    }[]
) => {
    return prisma.$transaction(async (tx) => {

        await tx.emailRecipient.deleteMany({
            where: {
                emailConfigurationId,
            },
        });

        if (recipients.length > 0) {
            await tx.emailRecipient.createMany({
                data: recipients.map((recipient) => ({
                    emailConfigurationId,
                    email: recipient.email,
                    type: recipient.type,
                })),
            });
        }

        return tx.emailRecipient.findMany({
            where: {
                emailConfigurationId,
            },
        });
    });
};


// ============================================================
// SFTP CONFIGURATION
// ============================================================

export const upsertSftpConfiguration = async (
    configurationId: string,
    data: {
        enabled?: boolean;
        host?: string;
        port?: number;
        username?: string;
        authenticationType?: "PASSWORD" | "PRIVATE_KEY";
        password?: string;
        privateKey?: string;
        remotePath?: string;
    }
) => {
    return prisma.sftpConfiguration.upsert({
        where: {
            configurationId,
        },

        create: {
            configurationId,
            ...data,
        },

        update: {
            ...data,
        },
    });
};


// ============================================================
// FILENAME CONFIGURATION
// ============================================================

export const upsertFilenameConfiguration = async (
    configurationId: string,
    template: string
) => {
    return prisma.filenameConfiguration.upsert({
        where: {
            configurationId,
        },

        create: {
            configurationId,
            template,
        },

        update: {
            template,
        },
    });
};


// ============================================================
// EXCEL CONFIGURATION
// ============================================================

export const upsertExcelConfiguration = async (
    configurationId: string,
    templateFile?: string
) => {
    return prisma.excelConfiguration.upsert({
        where: {
            configurationId,
        },

        create: {
            configurationId,
            templateFile,
        },

        update: {
            templateFile,
        },
    });
};


// ============================================================
// EXCEL MAPPINGS
// ============================================================

export const replaceExcelMappings = async (
    excelConfigurationId: string,
    mappings: {
        sourceColumn: string;
        targetColumn: string;
        transformation?: string;
    }[]
) => {
    return prisma.$transaction(async (tx) => {

        await tx.excelColumnMapping.deleteMany({
            where: {
                excelConfigurationId,
            },
        });

        if (mappings.length > 0) {
            await tx.excelColumnMapping.createMany({
                data: mappings.map((mapping) => ({
                    excelConfigurationId,
                    sourceColumn: mapping.sourceColumn,
                    targetColumn: mapping.targetColumn,
                    transformation: mapping.transformation,
                })),
            });
        }

        return tx.excelColumnMapping.findMany({
            where: {
                excelConfigurationId,
            },
        });
    });
};


// ============================================================
// REVISION CONFIGURATION
// ============================================================

export const upsertRevisionConfiguration = async (
    configurationId: string,
    data: {
        enabled?: boolean;
        format?: string;
        startingRevision?: number;
    }
) => {
    return prisma.revisionConfiguration.upsert({
        where: {
            configurationId,
        },

        create: {
            configurationId,
            ...data,
        },

        update: {
            ...data,
        },
    });
};

export const findExcelMappingsByPlantId = async (plantId: string) => {
    const configuration = await prisma.configuration.findUnique({
        where: { plantId },
        select: {
            excel: {
                select: {
                    mappings: {
                        select: { sourceColumn: true, targetColumn: true },
                    },
                },
            },
        },
    });

    return configuration?.excel?.mappings ?? [];
};
