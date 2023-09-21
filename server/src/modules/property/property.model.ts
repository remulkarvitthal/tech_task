import mongoose from 'mongoose';
import toJSON from '../toJSON/toJSON';
import { IProperty } from './property.interfaces';

const propertySchema = new mongoose.Schema<IProperty>(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ['Apartment', 'House', 'Condo', 'Commercial'],
            required: true,
        },
        bedrooms: {
            type: Number,
            required: true,
        },
        bathrooms: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        squareFeet: {
            type: Number,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        isAvailable: {
            type: Boolean,
            required: true,
        },
        agentId: {
            type: String,
            required: true,
        },
        imageLink: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

propertySchema.plugin(toJSON);

const Property = mongoose.model<IProperty>('Property', propertySchema);

export default Property;
