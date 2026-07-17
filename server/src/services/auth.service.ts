import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { findUserByEmail, updateLastLogin } from "../repositories/auth.repository";
import { LoginInput } from "../types/auth.types";
import { ApiError } from "../utils/ApiError";
import { env } from "../config/env";

export const loginUser = async ( input: LoginInput ) => {

    const user = await findUserByEmail(input.email);

    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }

    if (!user.isActive) {
        throw new ApiError(403, "User account is inactive");
    }

    const isPasswordValid = await bcrypt.compare(input.password, user.password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid email or password");
    }

    await updateLastLogin(user.id);

    const token = jwt.sign( {userId: user.id, roleId: user.roleId}, env.JWT_SECRET, {expiresIn: "1d"} );

    return {
        user: {id: user.id,firstName: user.firstName,lastName: user.lastName,email: user.email,role: user.role.name},
        token
    };
};