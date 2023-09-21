import mongoose from 'mongoose';
import Property from './property.model';
import { IProperty, NewCreatedProperty, UpdatePropertyBody } from './property.interfaces';

export const createProperty = async (propertyBody: NewCreatedProperty): Promise<IProperty> => {
    return Property.create(propertyBody);
};

export const getProperties = async (): Promise<IProperty[]> => Property.find();
export const getPropertyById = async (id: mongoose.Types.ObjectId): Promise<IProperty | null> => Property.findById(id);

export const getPropertyByName = async (name: string): Promise<IProperty | null> => Property.findOne({ name });
export const getPropertyByAgent = async (agentId: string): Promise<IProperty | null> => Property.findOne({ agentId });

export const updatePropertyById = async (
    propertyId: mongoose.Types.ObjectId,
    updateBody: UpdatePropertyBody
): Promise<IProperty | null> => {
    const property = await getPropertyById(propertyId);
    if (!property) {
        throw new Error('Property not found');
    }
    Object.assign(property, updateBody);
    await property.save();
    return property;
};

export const deletePropertyById = async (propertyId: mongoose.Types.ObjectId): Promise<IProperty | null> => {
    const property = await getPropertyById(propertyId);
    if (!property) {
        throw new Error('Property not found');
    }
    await property.deleteOne();
    return property;
};
