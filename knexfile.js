require('dotenv').config();

const CLIENT = 'postgresql';

const DEFAULT = {
  client: CLIENT,
  connection: {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
  },
  pool: { min: 2, max: 10 },
  migrations: {
    directory: './src/database/migrations',
    tableName: 'knex_migrations',
  },
};

module.exports = {
  test: {
    ...DEFAULT,
    connection: {
      ...DEFAULT.connection,
      database: process.env.DB_NAME || 'omni11_test',
    },
  },

  development: {
    ...DEFAULT,
    connection: {
      ...DEFAULT.connection,
      database: process.env.DB_NAME || 'omni11_dev',
    },
  },

  staging: {
    ...DEFAULT,
    connection: {
      ...DEFAULT.connection,
      database: process.env.DB_NAME || 'omni11_stag',
    },
  },

  production: {
    ...DEFAULT,
    connection: {
      ...DEFAULT.connection,
      database: process.env.DB_NAME || 'omni11_prod',
    },
  },
};
