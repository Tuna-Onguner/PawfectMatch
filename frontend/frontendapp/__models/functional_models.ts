export interface Pet {
  petId: number;
  petName: string;
  petSize: string;
  petImage: string;
  petColor: string;
  isAdopted: boolean;
  adopterId: number;
  aoId: number;
  aoName: string;
  petBreedName: string;
  petAge: number;
  petBreedId: number;
}

export interface Breed {
  breedId: number;
  breedName: string;
  intelligence: number;
  playfulness: number;
}

export interface Cat {
  catId: number;
}

export interface Dog {
  dogId: number;
}

export interface OtherA {
  otherId: number;
  otherName: string;
}

export interface BlogField {
  blogFieldId: number;
  blogFieldName: string;
}

export interface Blog {
  blogId: number;
  bloggerName: string;
  blogImage: string | null;
  blogContent: string;
  blogTitle: string;
  blogFieldName: string;
  isRestricted: boolean;
  publishedDate: Date | null;
}

export interface ExpertiseField {
  expertiseFieldId: number;
  expertiseFieldName: string;
}

export interface Counsels {
  adopterId: number;
  adopterName: string;
  expertId: number;
  expertName: string;
  adviceDate: Date;
  expertiseFieldId: number;
  expertiseFieldName: string;
  adopterProblem: string;
  expertResponse: string;
  expertResponseDate: Date;
  adviceStatus: string;
}

export interface Schedule {
  scheduleId: number;
  vetId: number;
  isRestricted: boolean;
  scheduleBeginningDate: Date;
  scheduleEndDate: Date;
}

export interface Slot {
  slotId: number;
  scheduleId: number;
  isReserved: boolean;
  date: Date;
  startHour: Date;
  endHour: Date;
}

export interface Donation {
  donationId: number;
  adopterId: number;
  donationDate: Date;
  donationAmount: number;
  donationStatus: string;
  donatedTo: string;
}

export interface DonationReception {
  donationId: number;
  adopterId: number;
  donationStatus: string;
  receptionDate: Date;
  receivedAmount: number;
  adminId: number;
}

export interface Examination {
  exId: number;
  exDescription: string;
  exFile: string; // Assuming the file is stored as binary data
  petName: string;
}

export interface Reservation {
  petId: number;
  adopterId: number;
  rvDate: Date;
  rvStatus: string;
  rvResponseDate: Date | null;
  exId: number | null;
  reasoning: string;
  slots: Slot[];
}


