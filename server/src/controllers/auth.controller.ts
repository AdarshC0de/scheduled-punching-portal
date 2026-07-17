import { Request, Response } from "express";
import { loginUser } from "../services/auth.service";
import { ApiResponse } from "../utils/ApiResponse";

export const login = async (req: Request, res: Response) => {

    const result = await loginUser(req.body);
    res.status(200).json(new ApiResponse(true, "Login successful", result));
    
};