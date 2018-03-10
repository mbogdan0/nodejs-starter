interface Config {
    mongoUri: string;
    options: any;
}

const config: Config = {
    mongoUri: 'mongodb://localhost/test-apple',
    options: {
        db: {
            safe: true
        },
        autoIndex: false, // Don't build indexes
        reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
        reconnectInterval: 500, // Reconnect every 500ms
        poolSize: 10, // Maintain up to 10 socket connections
        // If not connected, return errors immediately rather than waiting for reconnect
        bufferMaxEntries: 0
    }
};

export default config;