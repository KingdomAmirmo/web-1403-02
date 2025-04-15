import {createServer} from 'http';

let controllers = [];

function use(method, name, func){
    let item = {
        command: name,
        function: func,
        method: method
    }
    controllers.push(item);
}

function router(request, response){
    let url = request.url.split('/');
    let command = url[1];

    for(let item of controllers){
        if(item.command === command && item.method === request.method){
            item.function(request, response);
        }
    }
}

let myServer = createServer(function(request, response){
    console.log(request.method, request.url);

    let data = '';
    request.on("data", function(chunk){
        data += chunk;
    });
    request.on("end", function(){
        try{
            data = JSON.parse(data);
        }
        catch(e){
            
        }
        request.data = data;
        request.asghar = 1;
        router(request, response);
    });
});

use("GET", 'sum', function(request, response){
    let url = request.url.split('/');
    let inputs = url.slice(2);
    response.write((parseInt(inputs[0]) + parseInt(inputs[1])).toString());
    response.end();
});

use("POST", 'sum', function(request, response){
    let url = request.url.split('/');
    let input_first = request.data.input1;
    let input_second = request.data.input2;
    response.write((input_first + input_second).toString());
    response.end();
});


use("GET" ,'log', function(request, response){
    console.log('post data is:', request.data);
    response.end("Done!");
});








myServer.listen(8000);
console.log("Server Running on port 8000...");



// export {
//     start, 
//     use
// }