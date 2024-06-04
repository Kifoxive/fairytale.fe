export interface User {
    id: string;
    email: string;
    number: number;
    mobilePhone: string;
    name: string;
    surname: string;
    role: AuthRole;
    dispatcher_id?: number;
}

export enum AuthRole {
    USER = 'user',
    DISPATCHER = 'dispatcher',
    ONBOARDING = 'onboarding',
}

export interface AuthState {
    isAuthenticated: boolean | null;
    user: User | null;
    token: string | null;
}

export interface LoginError extends Error {
    message: string;
}

export interface SignupError extends Error {
    errors: {
        message: string;
        extensions: {
            code: 'RECORD_NOT_UNIQUE' | string;
            field: 'email' | string;
        };
    }[];
}

export interface RequestResetPasswordError extends Error {
    errors: {
        message: string;
        extensions: {
            code: 'INVALID_PAYLOAD' | 'FORBIDDEN' | string;
        };
    }[];
}

export interface AuthToken {
    email: string;
    emailPassword: string;
    exp: number;
    iat: number;
    jobTitle: string;
    mobilePhone: string;
    number: number;
    name: string;
    surname: string;
    role: AuthRole;
    user_id: string;
    dispatcher_id?: number;
}
