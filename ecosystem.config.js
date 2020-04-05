module.exports = {
  apps: [
    {
      name: 'be-the-hero_API',
      script: 'src/server.js',
      instances: 1,
      autorestart: true,
      watch: true,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
