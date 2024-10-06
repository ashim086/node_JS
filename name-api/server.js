const http = require('http');
const fs = require('fs');
const path = require('path');

// File path to store the data
const filePath = (`${__dirname}`+'/'+'data.json');

// Helper function to read data from file
const readData=(err,res)=>{
    if(err) {
        return { lastId: 0, data: [] }; // Return structure with lastId and empty data array
    }
    else{
        
        
        const data = fs.readFileSync(filePath);
        return JSON.parse(data)
    };
}

// Helper function to write data to file
const writeData = (content) => {
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
};

// Create an HTTP server
const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/name') {
        let body = '';

        // Collect incoming data
        req.on('data', chunk => {
            body += chunk.toString();
        });

        // When the entire request body has been received
        req.on('end', () => {
            try {
                const { name } = JSON.parse(body);

                if (!name) {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: 'Name is required' }));
                    return;
                }

                // Read the current data and lastId
                const { lastId, data } = readData();

                // Increment the lastId for the new entry
                const newId = lastId + 1;

                // Create a new entry
                const newEntry = {
                    name,
                    id: newId
                };

                // Add the new entry to the data array
                data.push(newEntry);

                // Write the updated data and new lastId back to the file
                writeData({ lastId: newId, data });

                // Respond with the new entry
                res.statusCode = 201;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(newEntry));
            } catch (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Invalid JSON data' }));
            }
        });
    }
    // Handle GET request to show all data
    else if (req.method === 'GET' && req.url === '/names') {
        const { data } = readData();

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Not found' }));
    }
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
    