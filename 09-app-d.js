import {writeFile, readFile} from 'fs';
import {use, start, write} from "./07-httpFramework-a.js";
import jwt from 'jsonwebtoken';
const JWT_SECRET = 'mySecretString'
const TOKEN_TIME = 5; //minute

function verifyToken(token){
    try{
        let decoded = jwt.verify(token, JWT_SECRET);
        if((Date.now()/1000 - decoded.iat) / 60 < TOKEN_TIME){
            return true;
        }
        else {
            return false;
        }
    }
    catch(e){
        return false;
    }
}

function parseCookie(cookieString, key){
    let cookies = '';
    try{
        cookies = cookieString.split(';');
    }
    catch(e){
        return '';
    }
    for(let cookie of cookies){
        let splitted = cookie.split('=');
        if(splitted[0] === key){
            return splitted[1];
        }
    }
}

use('POST', 'sum', function (request, response) {
    console.log('cookie:', request.headers.cookie)


    if(! verifyToken(parseCookie(request.headers.cookie, 'token'))){
        write(response, 400, 'invalid token');
    }
    else{
        response.write((parseInt(request.data.input1) + parseInt(request.data.input2)).toString());
        response.end();
    }
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
            let dataObject = JSON.parse(fileData);
            for(let item of dataObject.records){
                if(item.user === request.data.user){
                    write(response, 400, 'user alrady exists.')
                    return;
                }
            }
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
    });
});
use('DELETE', 'user', function (request, response) {
    readFile('./users.json', 'utf8', function (error, fileData){
        if(error){
            console.log('ERROR:', error);
            write(response, 500, 'ERROR:' + error);
        }
        else{
            let dataObject = JSON.parse(fileData);
            let found = false;
            for(let i=0; i<dataObject.records.length; i++){
                if(dataObject.records[i].user === request.data.user){
                    dataObject.records.splice(i,1);
                    found = true;
                }
            }

            if(found){
                let dataString = JSON.stringify(dataObject);
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
            else{
                write(response, 400, 'User not found.')
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
            let dataObject = JSON.parse(fileData);
            let foundIndex = -1;
            for(let i=0; i<dataObject.records.length; i++){
                if(dataObject.records[i].user === request.data.user && dataObject.records[i].pass === request.data.pass){
                    foundIndex = i;
                }
            }

            if(foundIndex >= 0){
                let signedToken = jwt.sign(dataObject.records[foundIndex], JWT_SECRET);
                let cookie = [
                    "token="+signedToken+"; Max-Age="+TOKEN_TIME*60
                ];
                write(response, 200, JSON.stringify({token: signedToken}), cookie);
            }
            else{
                write(response, 400, 'Wrong username and/or password.')
            }
            
        }
    });
});


use('POST', 'item', function (request, response) {
    readFile('./todo.json', 'utf8', function (error, fileData){
        if(error){
            console.log('ERROR:', error);
            write(response, 500, 'ERROR:' + error);
        }
        else{
            let dataObject = JSON.parse(fileData);
           
            let record = {
                text: request.data.text,
                status: false,
                id: Math.floor(Math.random() * 10000)
            }
            dataObject.records.push(record);
            let dataString = JSON.stringify(dataObject);
            
            writeFile('./todo.json', dataString, function (error){
                if(error){
                    console.log('ERROR:', error);
                    write(response, 500, 'ERROR:' + error)
                }
                else{
                    console.log('item Created.');
                    write(response, 200, 'item Created.')
                }
            });
        }
    });
});


use('GET', 'item', function (request, response) {
    readFile('./todo.json', 'utf8', function (error, fileData){
        if(error){
            console.log('ERROR:', error);
            write(response, 500, 'ERROR:' + error);
        }
        else{
            write(response, 200, fileData)
        }
       
    });
});


use('PUT', 'item', function (request, response) {
    // if (!verifyToken(parseCookie(request.headers.cookie, 'token'))) {
    //     write(response, 401, 'Invalid token');
    //     return;
    // }

    readFile('./todo.json', 'utf8', function (error, fileData) {
        if (error) {
            console.log('ERROR:', error);
            write(response, 500, 'ERROR:' + error);
            return;
        }

        let dataObject = JSON.parse(fileData);
        let itemFound = false;

        // پیدا کردن آیتم و به‌روزرسانی وضعیت آن
        for (let i = 0; i < dataObject.records.length; i++) {
            if (dataObject.records[i].id == request.data.id) {
                dataObject.records[i].status = request.data.status;
                itemFound = true;
                break;
            }
        }

        if (!itemFound) {
            write(response, 404, 'Item not found');
            return;
        }

        // ذخیره تغییرات در فایل
        writeFile('./todo.json', JSON.stringify(dataObject), function (error) {
            if (error) {
                console.log('ERROR:', error);
                write(response, 500, 'ERROR:' + error);
            } else {
                write(response, 200, 'Item status updated successfully');
            }
        });
    });
});

start();
