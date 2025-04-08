const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === "POST") {
        let command = req.url.split('/')[1];

        if (command === "sum") {
            let body = '';

            req.on('data', chunk => {
                body += chunk.toString(); 
            });

            req.on('end', () => {
                const numbers = JSON.parse(body);
                const sum = Number(numbers.num1) + Number(numbers.num2);
                console.log("Sum Of Numbers is:", sum);
                res.end(`Sum of ${numbers.num1} and ${numbers.num2} is ${sum}`);
            });
        } else {
            res.end('Invalid command');
        }
    } else {
        res.end('Only POST requests are accepted');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log("Server running on port 8000");
});
