
//module importing

const http=require("http");
const fs=require("fs");

//file importing
const home  =fs.readFileSync('./index.html');


//creating server

const server=http.createServer((req,res)    =>  {



    const url=req.url;



    switch(url){
        case '/':
            res.writeHead(200, {'content-type': 'text/html'});
            res.write(home);
            res.end();
            break;
        default:
            res.end("404 error found")
            break;

    }
});



server.listen(6000,() =>{
    console.log("server at 6000");
});




