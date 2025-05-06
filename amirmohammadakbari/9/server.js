const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {

    if (req.method === 'GET' && req.url.startsWith('/ch7/')) {

        const param = req.url.split('/ch7/')[1];

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        

        res.end(`Received parameter: ${param}\n`);
    } else {

        res.writeHead(400, { 'Content-Type': 'text/plain' });
        
        res.end('Error: Invalid request. Please use GET method with /ch7/param.\n');
    }
});


server.listen(PORT, () => {
    console.log(`Server is running at http://127.0.0.1:${PORT}/`);
});
