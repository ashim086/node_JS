const http=require("http");
const fs=require("fs");


const home  =fs.readFileSync('./index.html');

const myserver= http.createServer((req,res) =>  {
    switch (req.url) {
        case '/':
            res.writeHead(200, {'content-type': 'text/html'});
            res.write(home);
            res.end();
            break;
        case '/about':
            res.end("Hi my name is ashim thapa magar");
    
        default:
            res.end("404 error found")
            break;
    }
});



myserver.listen(5000,   ()  =>{
    console.log("server at 5000");
});