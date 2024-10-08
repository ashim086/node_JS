const http = require('http');
const fs =require('fs');


const api=({__dirname,__filename});
const data1={
    name:"ashim",
    roll_name:28
};

const data=JSON.stringify(data1);
fs.writeFile("storage.json",data,(err)=>{
    console.log(data);
});

const read=fs.readFile("storage.json","utf-8",(err,data)=>{
    if(err) throw err;
const data2=JSON.parse(data);
    console.log(data2);
});
