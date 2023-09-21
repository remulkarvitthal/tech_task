import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

import * as agentService from './agent.service';

export const createAgent = async (req: Request, res: Response) => {
    const agent = await agentService.registerAgent(req.body);
    res.status(httpStatus.CREATED).send(agent);
};

export const getAgents = async (_req: Request, res: Response) => {
    try {
        const agents = await agentService.getAgents();

        if (!agents || agents.length === 0) {
            throw new Error('No agents found');
        }

        res.status(httpStatus.OK).json(agents);
    } catch (error: any) {
        res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

export const getById = async (req: Request, res: Response) => {
    if (typeof req.query['agentId'] === 'string') {
        const agent = await agentService.getAgentById(new mongoose.Types.ObjectId(req.query['agentId']));
        if (!agent) {
            throw new Error('Agent not found');
        }
        res.send(agent);
    }
};

export const updateAgent = async (req: Request, res: Response) => {
    if (typeof req.query['agentId'] === 'string') {
        const agent = await agentService.updateAgentById(new mongoose.Types.ObjectId(req.query['agentId']), req.body);
        res.send(agent);
    }
};

export const removeAgent = async (req: Request, res: Response) => {
    if (typeof req.query['agentId'] === 'string') {
        await agentService.deleteAgentById(new mongoose.Types.ObjectId(req.query['agentId']));
        res.status(httpStatus.NO_CONTENT).send();
    }
};
