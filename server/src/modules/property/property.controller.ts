import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import * as propertyService from './property.service';

export const create = async (req: Request, res: Response) => {
    const property = await propertyService.createProperty(req.body);
    res.status(httpStatus.CREATED).send(property);
};

export const getProperties = async (_req: Request, res: Response) => {
    try {
        const properties = await propertyService.getProperties();

        if (!properties || properties.length === 0) {
            throw new Error('No property found');
        }

        res.status(httpStatus.OK).json(properties);
    } catch (error: any) {
        res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

export const getById = async (req: Request, res: Response) => {
    if (typeof req.params['propertyId'] === 'string') {
        console.log(req.params)
        const property = await propertyService.getPropertyById(new mongoose.Types.ObjectId(req.params['propertyId']));
        console.log(property)
        if (!property) {
            throw new Error('Property not found');
        }
        res.send(property);
    }
};

export const update = async (req: Request, res: Response) => {
    if (typeof req.query['propertyId'] === 'string') {
        const property = await propertyService.updatePropertyById(
            new mongoose.Types.ObjectId(req.query['propertyId']),
            req.body
        );
        res.send(property);
    }
};

export const remove = async (req: Request, res: Response) => {
    if (typeof req.query['propertyId'] === 'string') {
        await propertyService.deletePropertyById(new mongoose.Types.ObjectId(req.query['propertyId']));
        res.status(httpStatus.NO_CONTENT).send();
    }
};
