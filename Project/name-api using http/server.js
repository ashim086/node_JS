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
                
                fs.readFile(path, "utf-8", (err, data) => {
                    if (err) {
                        res.statusCode = 500;
                        res.end("Error reading the file");
                    } else {
                        const existingData = JSON.parse(data);
                        
                        // Assign a new id based on the current length of the data
                        newEntry.id = existingData.length + 1;
                        existingData.push(newEntry); // Add new entry

                        // Write the updated data back to the file
                        fs.writeFile(path, JSON.stringify(existingData, null, 2), (err) => {
                            if (err) {
                                res.statusCode = 500;
                                res.end("Error writing the file");
                            } else {
                                res.statusCode = 200;
                                res.end("Data added successfully");
                            }
                        });
                    }
                });
            } catch (error) {
                res.statusCode = 400;
                res.end("Invalid JSON format");
            }
        });
    }else if (req.url.startsWith("/data/update/") && req.method === "PUT") {
        const id = parseInt(req.url.split('/')[3]); // Extract id from the URL
        let body = '';
    
        req.on('data', chunk => {
            body += chunk.toString();
        });
    
        req.on('end', () => {
            try {
                const updatedEntry = JSON.parse(body);
    
                // Read existing data
                fs.readFile(path, "utf-8", (err, data) => {
                    if (err) {
                        res.statusCode = 500;
                        res.end("Error reading the file");
                    } else {
                        let existingData = JSON.parse(data);
                        const index = existingData.findIndex(item => item.id === id); // Find the entry by id
    
                        if (index !== -1) {
                            // Replace the entire object at the found index
                            updatedEntry.id = id;  // Ensure the id remains the same
                            existingData[index] = updatedEntry;  // Replace the object
    
                            // Write the updated data back to the file
                            fs.writeFile(path, JSON.stringify(existingData, null, 2), (err) => {
                                if (err) {
                                    res.statusCode = 500;
                                    res.end("Error writing the file");
                                } else {
                                    res.statusCode = 200;
                                    res.end("Data replaced successfully");
                                }
                            });
                        } else {
                            res.statusCode = 404;
                            res.end("Data not found");
                        }
                    }
                });
            } catch (error) {
                res.statusCode = 400;
                res.end("Invalid JSON format");
            }
        });
    }
    
    // DELETE method to delete data by id
    else if (req.url.startsWith("/data/delete/") && req.method === "DELETE") {
        const id = parseInt(req.url.split('/')[3]); // Extract id from the URL

        // Read existing data
        fs.readFile(path, "utf-8", (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end("Error reading the file");
            } else {
                let existingData = JSON.parse(data);
                const filteredData = existingData.filter(item => item.id !== id); // Filter out the item by id

                if (existingData.length !== filteredData.length) {
                    // Reassign serial ids after deletion
                    const reorderedData = filteredData.map((item, index) => {
                        return { ...item, id: index + 1 }; // Reassign ids serially
                    });

                    // Write the updated data to the file
                    fs.writeFile(path, JSON.stringify(reorderedData, null, 2), (err) => {
                        if (err) {
                            res.statusCode = 500;
                            res.end("Error writing the file");
                        } else {
                            res.statusCode = 200;
                            res.end("Data deleted and ids reordered successfully");
                        }
                    });
                } else {
                    res.statusCode = 404;
                    res.end("Data not found");
                }
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