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
export interface ExamResults {
    examResultId: number;
    veterinarianId: number;
    petId: number;
    examDate: Date;
    examTime: string;
    examStatus: string;
    adopterId: number;
    examResults: string;
    }

export interface Schedule { 
    scheduleId: number;
    veterinarianId: number;
    beginTime: string;
    endTime: string;
    numberOfDays: number;
    isRestricted: boolean;
    }
