import mongoose from 'mongoose';
import validator from 'validator';
import { IAgent } from './agent.interfaces';
import toJSON from '../toJSON/toJSON';

const agentSchema = new mongoose.Schema<IAgent>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate(value: string) {
                if (!validator.isEmail(value)) {
                    throw new Error('Invalid email');
                }
            },
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 8,
            validate(value: string) {
                if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                    throw new Error('Password must contain at least one letter and one number');
                }
            },
            private: true, // used by the toJSON plugin
        },
        companyName: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

agentSchema.plugin(toJSON);

const Agent = mongoose.model<IAgent>('Agent', agentSchema);

export default Agent;
