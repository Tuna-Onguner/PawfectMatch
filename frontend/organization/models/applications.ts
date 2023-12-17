export interface AdoptionApplication{
    id: number;
    petId: number;
    petName: string;
    userId: number;
    userName: string;
    userEmailAddress: string;
    userPhoneNumber: string;
    status: string;
    organizationId: number;
    organizationName: string;
    applicationDate: Date;
    motivation: string;
}