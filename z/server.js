const http=require('http');
const fs=require('fs');
const data1={
    name:"ashim",
    roll_name:28
};
const writee=JSON.stringify(data1);
const filePath=(`${__dirname}`+'/'+'data.json');


const read=fs.readFileSync(filePath,"utf-8");




const server=http.createServer((req,res)=>{
    
const dr=JSON.parse(read);
console.log(dr);

const write=fs.writeFile("data.json",writee,(err)=>{
    console.log(write);
});


    if(req.url==="/"&&req.method==="GET"){
        const write=fs.writeFile("data.json",data,(err)=>{
            console.log("entered data");
          });
    res.end("hi");}
    else if(req.url==="/data"&&req.method==="GET")
    {  
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');s
        res.end(JSON.stringify(readData));
    }
});





server.listen(4500, () => {
    console.log('Server is running on http://localhost:3000');
});