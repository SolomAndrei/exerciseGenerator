import { app } from './app';
import dotenv from 'dotenv';

dotenv.config();

function getPort(): number {
    const portEnv = process.env.SERVER_PORT;
    const port = portEnv ? parseInt(portEnv, 10) : 5001;

    if (isNaN(port) || port <= 0) {
        throw new Error(`Invalid PORT value: "${portEnv}"`);
    }

    return port;
}
function startServer(): void {
    try {
        const port = getPort();
        app.listen(port, () => {
            console.info(`🚀 Server is running at http://localhost:${port}`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}

startServer();
