export interface User {
  userId: number;
  userName: string;
  phoneNumber: string;
  email: string;
  password: string;
}

export interface Adopter extends User {
  adopterId: number;
  cardNumber: string;
  cvv: string;
  expirationDate: Date| null;
}

export interface Blogger extends Adopter {
  bloggerId: number;
}

export interface Expert extends Blogger {
  expertId: number;
}

export interface Veterinarian extends User {
  vetId: number;
  vetStreet: string;
  vetCountry: string;
  vetCity: string;
  vetState: string;
}

export interface AdoptionOrganization extends User {
  aoId: number;
  aoName: string;
  aoStreet: string;
  aoCountry: string;
  aoCity: string;
  aoState: string;
  totalDonationReceived: number;
  totalGrantsReceived: number;
  totalDonators: number;
  petCount: number;
}

