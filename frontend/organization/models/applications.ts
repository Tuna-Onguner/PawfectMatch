import { Pet } from "./pet-models";

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
    file: File | null;
}

export interface Agreement{
    id: number;
    organizationId: number;
    organizationName: string;
    veterinarianId: number;
    veterinarianName: string;
    agreementDate: Date;
    agreementText: string;
    file: File | null;
    petBreed: string;
}