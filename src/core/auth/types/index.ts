export interface IUser {
    user_id: string;
    email: string;
    firstName: string;
    lastName: string | null;
    role: AUTH_ROLE;
    avatarUrl: string | null;
    isconfirmd: boolean;
    createdAt: number;
    updatedAt: number;
}

export enum AUTH_ROLE {
    admin = 'admin',
    guest = 'guest',
}

export interface AuthState {
    isAuthenticated: boolean | null;
    user: IUser | null;
    accessToken: string | null;
}

export interface ITokenPayload {
    firstName: string;
    lastName: string;
    email: string;
    role: AUTH_ROLE;
    user_id: string;
}
