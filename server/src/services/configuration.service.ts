import {
    createConfiguration,
    findConfigurationByPlantId,

    upsertGeneralConfiguration,

    upsertEmailConfiguration,
    replaceEmailRecipients,

    upsertSftpConfiguration,

    upsertFilenameConfiguration,

    upsertExcelConfiguration,
    replaceExcelMappings,

    upsertRevisionConfiguration,
} from "../repositories/configuration.repository";

import { findPlantById } from "../repositories/plant.repository";

import { ApiError } from "../utils/ApiError";


export const getConfigurationService = async (
    plantId: string
) => {

    const plant = await findPlantById(plantId);

    if (!plant) {
        throw new ApiError(
            404,
            "Plant not found!"
        );
    }

    let configuration =
        await findConfigurationByPlantId(plantId);

    if (!configuration) {

        await createConfiguration(plantId);

        configuration =
            await findConfigurationByPlantId(plantId);

        // TypeScript now knows that if this point
        // is reached, configuration cannot be null.

        if (!configuration) {
            throw new ApiError(
                500,
                "Failed to create plant configuration!"
            );
        }
    }

    return configuration;
};


export const updateGeneralConfigurationService = async (
    plantId: string,
    data: {
        timezone?: string;
        isActive?: boolean;
    }
) => {

    const configuration =
        await getConfigurationService(plantId);

    return upsertGeneralConfiguration(
        configuration.id,
        data
    );
};


export const updateEmailConfigurationService = async (
    plantId: string,
    data: {
        enabled?: boolean;
        smtpHost?: string;
        smtpPort?: number;
        username?: string;
        password?: string;
        fromEmail?: string;

        recipients?: {
            email: string;
            type: "TO" | "CC" | "BCC";
        }[];
    }
) => {

    const configuration =
        await getConfigurationService(plantId);

    const {
        recipients,
        ...emailData
    } = data;

    const emailConfiguration =
        await upsertEmailConfiguration(
            configuration.id,
            emailData
        );

    if (recipients !== undefined) {

        await replaceEmailRecipients(
            emailConfiguration.id,
            recipients
        );
    }

    return findConfigurationByPlantId(plantId);
};


export const updateSFTPConfigurationService = async (
    plantId: string,
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

    const configuration =
        await getConfigurationService(plantId);

    await upsertSftpConfiguration(
        configuration.id,
        data
    );

    return findConfigurationByPlantId(plantId);
};


export const updateFilenameConfigurationService = async (
    plantId: string,
    template: string
) => {

    const configuration =
        await getConfigurationService(plantId);

    return upsertFilenameConfiguration(
        configuration.id,
        template
    );
};


export const updateExcelConfigurationService = async (
    plantId: string,
    data: {
        templateFile?: string;

        mappings?: {
            sourceColumn: string;
            targetColumn: string;
            transformation?: string;
        }[];
    }
) => {

    const configuration =
        await getConfigurationService(plantId);

    const excelConfiguration =
        await upsertExcelConfiguration(
            configuration.id,
            data.templateFile
        );

    if (data.mappings !== undefined) {

        await replaceExcelMappings(
            excelConfiguration.id,
            data.mappings
        );
    }

    return findConfigurationByPlantId(plantId);
};


export const updateRevisionConfigurationService = async (
    plantId: string,
    data: {
        enabled?: boolean;
        format?: string;
        startingRevision?: number;
    }
) => {

    const configuration =
        await getConfigurationService(plantId);

    return upsertRevisionConfiguration(
        configuration.id,
        data
    );
};