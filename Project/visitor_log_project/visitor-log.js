const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const PORT = 3000;

// In-memory visitor data
let visitors = [];

// Helper to serve static HTML files
function serveStaticFile(res, filePath, contentType) {
    fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end('<h1>Server Error</h1>');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
}

// Function to render dynamic visitor list into HTML
function renderVisitorList() {
    return visitors.map(visitor => `
        <li>
            ${visitor.name} - ${visitor.visitDate} 
            <form action="/edit-visitor" method="GET" style="display:inline;">
                <input type="hidden" name="id" value="${visitor.id}">
                <button type="submit">Edit</button>
            </form>
            <form action="/delete-visitor" method="POST" style="display:inline;">
                <input type="hidden" name="id" value="${visitor.id}">
                <button type="submit">Delete</button>
            </form>
        </li>
    `).join('');
}

// Function to render the edit form
function renderEditForm(visitor) {
    return `
    <h1>Edit Visitor</h1>
    <form action="/update-visitor" method="POST">
        <input type="hidden" name="id" value="${visitor.id}">
        <input type="text" name="name" value="${visitor.name}" required>
        <input type="date" name="visitDate" value="${visitor.visitDate}" required>
        <button type="submit">Update Visitor</button>
    </form>
    <a href="/">Back to Visitor List</a>
    `;
}

// Function to handle form submissions
function handleFormSubmission(req, callback) {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
        const parsedData = querystring.parse(body);
        callback(parsedData);
    });
}

// Create server
http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        // Render the index.html file with visitor list
        fs.readFile('./views/index.html', 'utf8', (err, content) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>Server Error</h1>');
            } else {
                // Inject visitor list into the HTML content
                const visitorListHtml = renderVisitorList();
                const finalContent = content.replace('{{visitorList}}', visitorListHtml);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(finalContent);
            }
        });

    } else if (req.url.startsWith('/edit-visitor') && req.method === 'GET') {
        // Extract the visitor ID from the query string
        const query = querystring.parse(req.url.split('?')[1]);
        const visitorId = parseInt(query.id, 10);
        const visitor = visitors.find(v => v.id === visitorId);

        if (visitor) {
            // Render the edit form with visitor data
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(renderEditForm(visitor));
        } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>Visitor Not Found</h1>');
        }

    } else if (req.url === '/update-visitor' && req.method === 'POST') {
        // Handle updating the visitor
        handleFormSubmission(req, formData => {
            const visitorId = parseInt(formData.id, 10);
            const visitorIndex = visitors.findIndex(v => v.id === visitorId);

            if (visitorIndex !== -1) {
                visitors[visitorIndex] = {
                    id: visitorId,
                    name: formData.name,
                    visitDate: formData.visitDate
                };
                res.writeHead(302, { 'Location': '/' });
                res.end();
            } else {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>Visitor Not Found</h1>');
            }
        });

    } else if (req.url === '/add-visitor' && req.method === 'POST') {
        // Handle adding a new visitor
        handleFormSubmission(req, formData => {
            const newVisitor = {
                id: visitors.length ? visitors[visitors.length - 1].id + 1 : 1,
                name: formData.name,
                visitDate: formData.visitDate
            };
            visitors.push(newVisitor);
            // Redirect back to the home page
            res.writeHead(302, { 'Location': '/' });
            res.end();
        });

    } else if (req.url === '/delete-visitor' && req.method === 'POST') {
        // Handle deleting a visitor
        handleFormSubmission(req, formData => {
            const visitorId = parseInt(formData.id, 10);
            visitors = visitors.filter(visitor => visitor.id !== visitorId);
            // Redirect back to the home page
            res.writeHead(302, { 'Location': '/' });
            res.end();
        });

    } else if (req.url === '/style.css' && req.method === 'GET') {
        // Serve the CSS file
        serveStaticFile(res, './style.css', 'text/css');

    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
    }

}).listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
