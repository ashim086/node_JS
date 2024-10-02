const mysql =require("mysql");
var ccon    =   mysql.createConnection({


    host:"localhost",
    user:"root",
    password:"",
    database:"registration"
})

ccon.connect((err)  =>  {
    if(err) throw err;
    console.log("connnect");
})

module.exports=ccon;