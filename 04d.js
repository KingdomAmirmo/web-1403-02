import {createServer} from 'http';

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
        router(request, response);
    });
});

function router(request, response){
    let url = request.url.split('/');
    let command = url[1];
    let inputs = url.slice(2);
    console.log('command:', command, 'inputs:', inputs);

    if(command === 'sum' && request.method === 'GET'){
        response.write((parseInt(inputs[0]) + parseInt(inputs[1])).toString());
        response.end();
    }
    else if(command === 'log'){
        console.log('post data is:', request.data);
        response.end();
    }
    else if(command === 'sum' && request.method === 'POST'){
        response.write((parseInt(request.data.input1) + parseInt(request.data.input2)).toString());
        response.end();
    }
    else{
        response.write("Command not found.");
        response.end();
    }
}
myServer.listen(80);