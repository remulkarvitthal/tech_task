import mongoose from 'mongoose';
import Agent from './agent.model';
import { UpdateUserBody, NewRegisteredUser, IAgent } from './agent.interfaces';

export const registerAgent = async (userBody: NewRegisteredUser): Promise<IAgent> => {
    return Agent.create(userBody);
};

export const getAgents = async (): Promise<IAgent[]> => Agent.find();

export const getAgentById = async (id: mongoose.Types.ObjectId): Promise<IAgent | null> => Agent.findById(id);

export const getAgentByEmail = async (email: string): Promise<IAgent | null> => Agent.findOne({ email });

export const updateAgentById = async (
    userId: mongoose.Types.ObjectId,
    updateBody: UpdateUserBody
): Promise<IAgent | null> => {
    const agent = await getAgentById(userId);
    if (!agent) {
        throw new Error('Agent not found');
    }
    Object.assign(agent, updateBody);
    await agent.save();
    return agent;
};

export const deleteAgentById = async (userId: mongoose.Types.ObjectId): Promise<IAgent | null> => {
    const user = await getAgentById(userId);
    if (!user) {
        throw new Error('Agent not found');
    }
    await user.deleteOne();
    return user;
};

