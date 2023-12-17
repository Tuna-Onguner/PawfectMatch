export interface Pet {
    id: number;
    name: string;
    age: number;
    type: string;
    breed: string;
    color: string;
    weight: number;
    height: number;
    description: string;
    image: string;
    organizationId: number;
    organizationName: string;
}

export interface Oversee {
    id: number;
    veterinarianId: number;
    name: string;
    age: number;
    type: string;
    breed: string;
    color: string;
    weight: number;
    height: number;
    description: string;
    image: string;
    organizationId: number;
    organizationName: string;
    feedback: string;
}