const http = require('http');

const server = http.createServer((req, res) => {

    if (req.method == "GET") {
        let url = req.url.split('/');
        let command = url[1];
        if (command == "sum") {
            console.log("Sum Of Numbers is :" , Number(url[2]) + Number(url[3]) );
        }
    }
    res.end('okay');
})

server.listen(8000, '127.0.0.1', () => {
    console.log("Server running on port 8000");

})