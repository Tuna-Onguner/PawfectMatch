export interface Agreement {
    agreementId: number;
    organizationName: string;
    agreementText: string;
    beginDate: Date;
    endDate: Date;
    agreementStatus: string;
    }

export interface Appointments {
    appointmentId: number;
    veterinarianId: number;
    petId: number;
    appointmentDate: Date;
    appointmentTime: string;
    appointmentStatus: string;
    adopterId: number;
    reason: string;
}