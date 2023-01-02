export type AccessLevel = 'User' | 'Moderator' | 'Admin';

export type IUser = {
    id: number;
    username: string;
    name?: string;
    email?: string;
    password?: string;
    access_level: AccessLevel;
    created_at: Date;
    updated_at?: Date;
};

export type ISignUpFormData = {
    name?: string;
    email?: string;
    username: string;
    password: string;
    passwordConfirmation: string;
};

export type ISignInFormData = {
    username: string;
    password: string;
};

export type IRecoveryFormData = {
    username: string;
};

export type IRecoveryTokenFormData = {
    username: string;
    tokenize: string;
    password: string;
    passwordConfirmation: string;
};

export type IErrorMessage = {
    rule: string;
    field: string;
    message: string;
};

export type IErrorResponse = {
    errors: IErrorMessage[];
};

export type IResponseAuth = {
    statusCode: number;
    message: string;
    auth: {
        type: string;
        token: string;
    };
    user: IUser;
    errors?: IErrorMessage[];
};

export type IResponseRefresh = {
    statusCode: number;
    message: string;
    auth: {
        type: string;
        token: string;
    };
    user: IUser;  
};

export type IResponseRecovery = {
    statusCode: number;
    message: string;
    errors?: IErrorMessage[];
};

export type IResponseDonation = {
    statusCode: number;
    message: string;
    donates: {
        data: DonatePackage[];
        meta: Meta;
    };
    errors?: IErrorMessage[];
};