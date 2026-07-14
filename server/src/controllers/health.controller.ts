import { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse";

export const health = (
    req: Request,
    res: Response
) => {

    res.json(

        new ApiResponse(

            true,

            "Server Healthy"

        )

    );

};