import { z } from "zod";

export const createManualUploadSchema = z.object({
    rows: z.array(z.record(z.string(), z.unknown())).min(1).max(5000),
});
