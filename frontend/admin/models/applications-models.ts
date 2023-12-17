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
    motivationFile?: {
        fileName: string;
        filePath: string;
        fileSize: number;
        // Add more properties as needed
      };
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
    motivationFile?: {
        fileName: string;
        filePath: string;
        fileSize: number;
        // Add more properties as needed
      };
}

export interface GrantApplication{
    id: number;
    userId: number;
    userName: string;
    userEmailAddress: string;
    userPhoneNumber: string;
    status: string;
    organizationId: number;
    organizationName: string;
    applicationDate: Date;
    motivation: string;
    responseDate: Date;
    amountNeeded: number;
}
export interface TransferringDonation{
    id: number;
    userId: number;
    userName: string;
    userEmailAddress: string;
    userPhoneNumber: string;
    status: string;
    organizationId: number;
    organizationName: string;
    applicationDate: Date;
    responseDate: Date;
    amount: number;
}