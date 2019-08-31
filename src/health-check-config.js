const { createTerminus } = require('@godaddy/terminus');

const onHealthCheck = async () => {
    // Nothing for now
}

createHealthCheck = (server) => {
    const terminusOptions = {
        healthChecks: { '/health-check': onHealthCheck }
    };
    createTerminus(server, terminusOptions);
};

exports.createHealthCheck = createHealthCheck;