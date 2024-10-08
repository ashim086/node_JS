const http = require('http');
const fs =require('fs');
const path = './storage.json';
 

if (!fs.existsSync(path)) 
{fs.writeFileSync(path,JSON.stringify([]));
}
  







const server=http.createServer((req,res)=>{

    if(req.url==="/"&&req.method==="GET"){
    res.end("hi");}
    else if(req.url==="/data"&&req.method==="GET")
    { 
        fs.readFile("storage.json","utf-8",(err,data2)=>{
        if(err) throw err;
        else{
            console.log(data2);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(data2);
        }
    });
    }
    else if(req.url==="/add" && req.method==="POST"){
        let body='';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const newEntry = JSON.parse(body); // Parse the incoming data as JSON
                
                // Write the new entry to the file, replacing the existing content
                fs.writeFile(path, JSON.stringify(newEntry, null, 2), (err) => {
                    if (err) {
                        res.statusCode = 500;
                        res.end("Error writing the file");
                    } else {
                        res.statusCode = 200;
                        res.end("Data replaced successfully");
                    }
                });
            } catch (error) {
                res.statusCode = 400;
                res.end("Invalid JSON format");
            }
        });
    }

    else {
        res.statusCode = 404;
        res.end("Not Found");
    }
});





server.listen(4500, () => {
    console.log('Server is running on http://localhost:4500');
});