let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibmFzc2VyIiwicGFzcyI6IjEyMyIsImlhdCI6MTc0NTMyNzQzN30.CpfEAX144wjhIEIKspECKRsa9d7EqRQr2KEi0m9-t1o";
import jwt from 'jsonwebtoken';
let jwtSecret = 'mySecretToken'

console.log(jwt.verify(token, jwtSecret));

console.log(Date.now());

console.log((Date.now()/1000 - jwt.verify(token, jwtSecret).iat) / 60);