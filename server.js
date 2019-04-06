const http = require('http');
const app = require('./app');

console.log("Starting Server");
const server = http.createServer(app);
server.listen(process.env.PORT || 3000); 