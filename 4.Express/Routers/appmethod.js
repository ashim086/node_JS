// Web frameworks provide resources such as HTML pages, scripts, images, etc. at different routes.

// The following function is used to define routes in an Express application −

// app.method(path, handler)

// To test Put request, open up your terminal and use cURL to execute the following request −


// curl -X POST "http://localhost:3000/hello"


const express=require('express');
const app=express();




app.get('/hello', (req, res)=>{
    res.send("Hello World!");
 });
app.put("/hello/put",(req,res)=>{
    res.send("Put method applied");
});

 app.listen(4000,(err,res)=>{
    console.log("server started")
 });