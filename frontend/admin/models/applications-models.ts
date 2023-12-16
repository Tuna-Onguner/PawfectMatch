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