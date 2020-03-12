/* eslint-disable @typescript-eslint/camelcase */
module.exports = [
    {
        script: 'index.js',
        name: 'collectibles-graphql-service',
        exec_mode: 'cluster',
        instances: 2,
        env: {
            NODE_ENV: 'development',
        },
        env_production: {
            NODE_ENV: 'production',
        },
        out_file: 'log/collectibles-graphql-service.log',
    },
];
