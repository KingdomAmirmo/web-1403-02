const http = require('http');
    
const PORT = 3000;

const server = http.createServer((req, res) => {

    console.log(`Received request: ${req.method} ${req.url}`);

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    
    res.end('Hello, world!\n');
});

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
});
