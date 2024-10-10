const fs= require("fs");

// fs.writeFile("message.txt","Hello from NodeJS!",(err) =>{

//     if(err) {
//         console.log("Problem occured while crating the required files");
//     }
//     console.log("The file has been save");
// });




// fs read ffile 


//to user this syntax fs.readfile write fs.readfile(".nameoffile","utf8",(function))
fs.readFile("./fileread.txt","utf-8",(err,data) =>{
    if(err) throw err;
    console.log(data);

})