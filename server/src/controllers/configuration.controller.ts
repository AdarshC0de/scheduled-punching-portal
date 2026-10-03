import {
    NextFunction,
    Request,
    Response,
} from "express";

import {
    getConfigurationService,

    updateGeneralConfigurationService,
    updateEmailConfigurationService,
    updateSFTPConfigurationService,
    updateFilenameConfigurationService,
    updateExcelConfigurationService,
    updateRevisionConfigurationService,
} from "../services/configuration.service";

import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";


export const getConfiguration = async (
    req: Request<{ plantId: string }>,
    res: Response,
    next: NextFunction
) => {

    try {

        const { plantId } = req.params;

        if (!plantId) {
            throw new ApiError(
                400,
                "Plant ID is required!"
            );
        }

        const configuration =
            await getConfigurationService(plantId);

        return res.status(200).json(
            new ApiResponse(
                true,
                "Configuration fetched successfully!",
                configuration
            )
        );

    } catch (error) {
        next(error);
    }
};


export const updateGeneralConfiguration = async (
    req: Request<{ plantId: string }>,
    res: Response,
    next: NextFunction
) => {

    try {

        const { plantId } = req.params;

        if (!plantId) {
            throw new ApiError(
                400,
                "Plant ID is required!"
            );
        }

        const configuration =
            await updateGeneralConfigurationService(
                plantId,
                req.body
            );

        return res.status(200).json(
            new ApiResponse(
                true,
                "General configuration updated successfully!",
                configuration
            )
        );

    } catch (error) {
        next(error);
    }
};


export const updateEmailConfiguration = async (
    req: Request<{ plantId: string }>,
    res: Response,
    next: NextFunction
) => {

    try {

        const { plantId } = req.params;

        if (!plantId) {
            throw new ApiError(
                400,
                "Plant ID is required!"
            );
        }

        const configuration =
            await updateEmailConfigurationService(
                plantId,
                req.body
            );

        return res.status(200).json(
            new ApiResponse(
                true,
                "Email configuration updated successfully!",
                configuration
            )
        );

    } catch (error) {
        next(error);
    }
};


export const updateSFTPConfiguration = async (
    req: Request<{ plantId: string }>,
    res: Response,
    next: NextFunction
) => {

    try {

        const { plantId } = req.params;

        if (!plantId) {
            throw new ApiError(
                400,
                "Plant ID is required!"
            );
        }

        const configuration =
            await updateSFTPConfigurationService(
                plantId,
                req.body
            );

        return res.status(200).json(
            new ApiResponse(
                true,
                "SFTP configuration updated successfully!",
                configuration
            )
        );

    } catch (error) {
        next(error);
    }
};


export const updateFilenameConfiguration = async (
    req: Request<{ plantId: string }>,
    res: Response,
    next: NextFunction
) => {

    try {

        const { plantId } = req.params;

        if (!plantId) {
            throw new ApiError(
                400,
                "Plant ID is required!"
            );
        }

        const configuration =
            await updateFilenameConfigurationService(
                plantId,
                req.body.template
            );

        return res.status(200).json(
            new ApiResponse(
                true,
                "Filename configuration updated successfully!",
                configuration
            )
        );

    } catch (error) {
        next(error);
    }
};


export const updateExcelConfiguration = async (
    req: Request<{ plantId: string }>,
    res: Response,
    next: NextFunction
) => {

    try {

        const { plantId } = req.params;

        if (!plantId) {
            throw new ApiError(
                400,
                "Plant ID is required!"
            );
        }

        const configuration =
            await updateExcelConfigurationService(
                plantId,
                req.body
            );

        return res.status(200).json(
            new ApiResponse(
                true,
                "Excel configuration updated successfully!",
                configuration
            )
        );

    } catch (error) {
        next(error);
    }
};


export const updateRevisionConfiguration = async (
    req: Request<{ plantId: string }>,
    res: Response,
    next: NextFunction
) => {

    try {

        const { plantId } = req.params;

        if (!plantId) {
            throw new ApiError(
                400,
                "Plant ID is required!"
            );
        }

        const configuration =
            await updateRevisionConfigurationService(
                plantId,
                req.body
            );

        return res.status(200).json(
            new ApiResponse(
                true,
                "Revision configuration updated successfully!",
                configuration
            )
        );

    } catch (error) {
        next(error);
    }
};