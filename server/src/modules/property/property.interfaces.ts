import { Document } from 'mongoose';

export interface IProperty extends Document {
    id: string;
    name: string;
    description: string;
    type: 'Apartment' | 'House' | 'Condo' | 'Commercial';
    bedrooms: number;
    bathrooms: number;
    price: number;
    squareFeet: number;
    location: string;
    isAvailable: boolean;
    agentId: string;
    imageLink: string;
}

export type UpdatePropertyBody = Partial<IProperty>;

export type NewCreatedProperty = Omit<IProperty, 'description'>;
