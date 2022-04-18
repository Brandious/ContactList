const env = process.env;

const config = {
    db: {
        host: env.DB_HOST || 'abul.db.elephantsql.com',
        port: env.DB_PORT || '5432',
        user: env.DB_USER || 'fjlcvjrg',
        password: env.DB_PASSWORD || 'TUnLQH2T9aimOUu3HgRatOCoCdakpCrx',
        database: env.DB_NAME || 'fjlcvjrg',
    },
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        aquire: 30000,
        idle: 10000
    }
}

module.exports = config; 