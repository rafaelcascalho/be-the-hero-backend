require('dotenv').config();
const app = require('./config/app');
const PORT = process.env.PORT || 3000;

const secure = process.env.SECURE || false;

if (!secure || secure === 'false') {
  app.listen(PORT, () =>
    console.log(`server running at http://localhost:${PORT}`)
  );
} else {
  const https = require('https');
  const fs = require('fs');

  const options = {
    key: fs.readFileSync('./src/config/ssl/key.pem'),
    cert: fs.readFileSync('./src/config/ssl/cert.crt'),
  };

  https
    .createServer(options, app)
    .listen(PORT, () =>
      console.log(`server running at http://localhost:${PORT}`)
    );
}
