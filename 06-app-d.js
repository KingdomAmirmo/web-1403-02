import {writeFile, readFile} from 'fs';
import {use, start, write} from "./05-httpFramework-f.js";

use('POST', 'sum', function (request, response) {
    response.write((parseInt(request.data.input1) + parseInt(request.data.input2)).toString());
    response.end();
});
use('GET', 'sum', function (request, response) {
    let url = request.url.split('/');
    let inputs = url.slice(2);
    response.write((parseInt(inputs[0]) + parseInt(inputs[1])).toString());
    response.end();
});
use('GET', 'log', function (request, response) {
    console.log('post data is:', request.data);
    response.end();
});
use('GET', 'file', function (request, response) {
    let url = request.url.split('/');
    let inputs = url.slice(2);

    readFile(inputs[0], function (error, fileBody){
        if(error){
            console.log('ERROR:', error);
            write(response, 400, 'ERROR:' + error)
        }
        else{
            response.write(fileBody);
            response.end();
        }
    });
});
use('POST', 'user', function (request, response) {
    readFile('./users.json', 'utf8', function (error, fileData){
        if(error){
            console.log('ERROR:', error);
            write(response, 500, 'ERROR:' + error);
        }
        else{
            let found = false;
            let dataObject = JSON.parse(fileData);

            for (const key in dataObject.records) {
                if (dataObject.records[key].user == request.data.user) {
                    console.log('User Exists!!');
                    write(response, 401, 'User Exists!!')
                    found = true
                    break;
                }
            }


           
            if (found === false) {
                dataObject.records.push(request.data);
                let dataString = JSON.stringify(dataObject);

                writeFile('./users.json', dataString, function (error){
                    if(error){
                        console.log('ERROR:', error);
                        write(response, 500, 'ERROR:' + error)
                    }
                    else{
                        console.log('User Created.');
                        write(response, 200, 'User Created.')
                    }
                });
            }
            
            
            
        }
    });
});





use('DELETE', 'user', function (request, response) {
    readFile('./users.json', 'utf8', function (error, fileData){
        if(error){
            console.log('ERROR:', error);
            write(response, 500, 'ERROR:' + error);
        }
        else{
            let found = false;
            let dataObject = JSON.parse(fileData);

            for (const key in dataObject.records) {
                if (dataObject.records[key].user == request.data.user) {
                    dataObject.records.splice(key, 1)
                    found = true;
                    break;
                }
            }


           
            // dataObject.records.push(request.data);
            let dataString = JSON.stringify(dataObject);
            if (found) {
                writeFile('./users.json', dataString, function (error){
                    if(error){
                        console.log('ERROR:', error);
                        write(response, 500, 'ERROR:' + error)
                    }
                    else{
                        console.log('User Deleted.');
                        write(response, 200, 'User Deleted.')
                    }
                });
            } 
            else {
                console.log('User Not found.');
                write(response, 200, 'User Not found.')
            }
          
            
            
            
        }
    });
});




use('POST', 'token', function (request, response) {
    readFile('./users.json', 'utf8', function (error, fileData){
        if(error){
            console.log('ERROR:', error);
            write(response, 500, 'ERROR:' + error);
        }
        else{
            let found = false;
            let dataObject = JSON.parse(fileData);

            for (const key in dataObject.records) {
                if (dataObject.records[key].user == request.data.user && dataObject.records[key].pass == request.data.pass) {
                    let userToken = Math.floor(Math.random() * 100000);
                    write(response, 200, "your token :" + userToken);
                    found = true;
                    break;
                }
            }


            if (!found) {
                console.log('Username Or password is invalid.');
                write(response, 401, 'Username Or password is invalid.');
            }

            
          
            
            
            
        }
    });
});




start();
