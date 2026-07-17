import {Request,Response,NextFunction} from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { JwtPayload } from "../types/auth.types";
import { ApiError } from "../utils/ApiError";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new ApiError(401,"Authentication required");
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
        throw new ApiError(401, "Invalid authorization format");
    }

    try {
        const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
        req.user = decoded;
        next();
    } 
    catch {
        throw new ApiError(401, "Invalid or expired token");
    }
};