//exporting modules

const http=require("http");
const fs=require("fs");
const { error } = require("console");

//inserting html
const home  =fs.readFileSync('./htmlpages/index.html');
const signup    =   fs.readFileSync('./htmlpages/signup.html');
const css   =   fs.readFileSync('./htmlpages/output.css');


//creating server request
const myserver= http.createServer((req,res) =>  {
    

    
            if(req.method === "GET" && req.url==='/'){
            res.writeHead(500, {'content-type': 'text/html'});
            res.write(home);
            res.end();}
            else if(url === '/output.css'){
                res.writeHead(200, {'content-type': 'text/css'});
                res.write(css);
                res.end()}
            else if(req.url==='/signup')
            {  res.writeHead(500, {'content-type': 'text/html'});
            res.write(signup);
            res.end();}
            else {
                // 404: Page not found
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404: Page not found</h1>');
            }
    
    
});


//defining server
myserver.listen(5000,   ()  =>{
    console.log("server at 5000");
});