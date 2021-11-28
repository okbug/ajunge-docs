
export interface RegisterPayload {
    confirmPassword: string;
    email: string;
    password: string;
    username: string;
}

export interface RegisterResult{
    success:boolean;
    data:{token:string}
    message?:string;
}

export interface LoginPayload {
    password: string;
    username: string;
}

export interface LoginResult{
    success:boolean;
    data:{token:string} //jwt token
    message?:string;
}