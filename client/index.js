const { Pool } = require('pg');

const pool = new Pool(
    {
        user: 'postgres',
        password: 'password',
        host: 'localhost',
        database: 'startup_db'
    },
);

module.exports = pool;