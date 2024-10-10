// // we will learn here about the file renaming



// // To rename file we will use the function 

// fs.rename(oldPath, newPath, callback);







const fs = require('fs');

fs.rename('./message.txt', './fileread.txt', (err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log('File renamed successfully!')
})