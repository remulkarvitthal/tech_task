import mongoose from 'mongoose';
import app from './app';
import config from './config/config';

let server: any;
mongoose.connect(config.mongoose.url).then(() => {
    // eslint-disable-next-line no-console
    console.log('Connected to MongoDB');
    server = app.listen(config.port, () => {
        // eslint-disable-next-line no-console
        console.log(`Listening to port ${config.port}`);
    });
});

const exitHandler = () => {
    if (server) {
        server.close(() => {
            // eslint-disable-next-line no-console
            console.log('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error: string) => {
    // eslint-disable-next-line no-console
    console.log(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    // eslint-disable-next-line no-console
    console.log('SIGTERM received');
    if (server) {
        server.close();
    }
});
