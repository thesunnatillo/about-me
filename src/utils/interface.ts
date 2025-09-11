export interface IEmpty {};

export interface ITokens {
    accsessToken: string;
    refreshToken: string;
};

export interface GlobalResponse<T> {
    data: T | null;
    total?: number;
    errMsg?: string;
};

export interface TokenPayload {
    id: number;
    fn: string;
    ln: string;
    login: string;
    role: number;
};