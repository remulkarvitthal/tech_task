import { Document } from 'mongoose';

export interface IAgent extends Document {
    name: string;
    email: string;
    password: string;
    companyName: string;
}

export type UpdateUserBody = Partial<IAgent>;

export type NewRegisteredUser = Omit<IAgent, 'companyName'>;

export type NewCreatedUser = Omit<IAgent, 'companyName'>;

export interface IAgent{
    agent: IAgent;
}
