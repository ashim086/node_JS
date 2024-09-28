// // Here we will learn about the file handling in node js to delete the file we created


// to delete the file we use fs module



const fs = require('fs');

fs.unlink('./messgae.txt', (err) => {
    if(err){
        console.log(err);
        return;
    }
    console.log('File Deleted Successfully!')
})