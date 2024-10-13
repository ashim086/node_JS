const express = require("express");
const path =require('./index.json');
const fs=require("fs");

const app=express();


// app.use(express.urlencoded({extended:false})); 

app.use(express.json()); 

app
.route("/api/user/:id")
.get((req,res)=>{
    const userid=Number(req.params.id);
    const userdata= path.find((path)=>path.id==userid);
    console.log(userdata);
    return res.json(userdata);
});

app.get("/data", (req, res) => {
    
    return res.json(path);
});

app.post("/add",(req,res)=>{
    const newentry=req.body;
    path.push({...newentry,id:path.length+1});
    fs.writeFile("index.json", JSON.stringify(path,null, 2),(err,res)=>{

        
        
    })
    return res.json("rendering");
})
app.put("/api/user/:id", (req, res) => {
    const userid = Number(req.params.id);
    const userIndex = path.findIndex((user) => user.id === userid);

    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }
    path[userIndex] = { ...path[userIndex], ...req.body };
    fs.writeFile("index.json", JSON.stringify(path, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ message: "Error updating file" });
        }
        return res.json("User updated successfully");
    });
});
app.delete("/api/user/:id", (req, res) => {
    const userid = Number(req.params.id);
    const userIndex = path.findIndex((user) => user.id === userid);

    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }
    path.splice(userIndex, 1);
    
   path.forEach((user, index) => {
    user.id = index + 1;  // Reassign ID sequentially starting from 1
});
    fs.writeFile("index.json", JSON.stringify(path, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ message: "Error deleting user from file" });
        }
        return res.json("User deleted successfully");
    });
});







app.listen(5555,()=>{
    console.log("server started");
})