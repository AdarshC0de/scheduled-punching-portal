import { z } from "zod";


export const updateGeneralConfigurationSchema =
    z.object({

        timezone:
            z.string()
                .min(1)
                .optional(),

        isActive:
            z.boolean()
                .optional(),
});



export const updateEmailConfigurationSchema =
    z.object({

        enabled:
            z.boolean()
                .optional(),

        smtpHost:
            z.string()
                .min(1)
                .optional(),

        smtpPort:
            z.number()
                .int()
                .min(1)
                .max(65535)
                .optional(),

        username:
            z.string()
                .optional(),

        password:
            z.string()
                .optional(),

        fromEmail:
            z.string()
                .email()
                .optional(),

        recipients:
            z.array(
                z.object({

                    email:
                        z.string()
                            .email(),

                    type:
                        z.enum([
                            "TO",
                            "CC",
                            "BCC",
                        ]),

                })
            )
            .optional(),
});


export const updateSFTPConfigurationSchema =
    z.object({

        enabled:
            z.boolean()
                .optional(),

        host:
            z.string()
                .min(1)
                .optional(),

        port:
            z.number()
                .int()
                .min(1)
                .max(65535)
                .optional(),

        username:
            z.string()
                .optional(),

        authenticationType:
            z.enum([
                "PASSWORD",
                "PRIVATE_KEY",
            ])
            .optional(),

        password:
            z.string()
                .optional(),

        privateKey:
            z.string()
                .optional(),

        remotePath:
            z.string()
                .optional(),
});


export const updateFilenameConfigurationSchema =
    z.object({

        template:
            z.string()
                .min(1)
                .max(500),
});


export const updateExcelConfigurationSchema =
    z.object({

        templateFile:
            z.string()
                .optional(),

        mappings:
            z.array(
                z.object({

                    sourceColumn:
                        z.string()
                            .min(1),

                    targetColumn:
                        z.string()
                            .min(1),

                    transformation:
                        z.string()
                            .optional(),

                })
            )
            .optional(),
});


export const updateRevisionConfigurationSchema =
    z.object({

        enabled:
            z.boolean()
                .optional(),

        format:
            z.string()
                .min(1)
                .max(100)
                .optional(),

        startingRevision:
            z.number()
                .int()
                .min(1)
                .optional(),
});