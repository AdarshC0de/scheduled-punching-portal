export interface LoginInput {
    email: string;
    password: string;
}

export interface AuthUser {
    id: string;
    firstName: string;
    lastName: string | null;
    email: string;
    role: string;
}

export interface JwtPayload {
    userId: string;
    roleId: string;
}