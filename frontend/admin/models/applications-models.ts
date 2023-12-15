export interface blogApplications {
    id: number;
    title: string;
    type: string;
    createdAt: Date;
    userID: number;
    status: string;
    motivation: string;
    userEmail: string;
    userName: string;
    userPhoneNumber: string;
}

export interface expertApplications {
    id: number;
    title: string;
    type: string;
    createdAt: Date;
    userID: number;
    status: string;
    motivation: string;
    userEmail: string;
    userName: string;
    userPhoneNumber: string;
}

export interface granteeApplications {
    id: number;
    title: string;
    type: string;
    createdAt: Date;
    userID: number;
    status: string;
    motivation: string;
    granteeAmount: number;
    userEmail: string;
    userName: string;
    userPhoneNumber: string;
}