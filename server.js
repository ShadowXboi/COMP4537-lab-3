const http = require('http');
const url = require('url');
const fs = require('fs');

const { getDate } = require('./modules/utils');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

 // Handling different routes
 if (parsedUrl.pathname === '/COMP4537/labs/3/getDate/') {
    const name = parsedUrl.query.name || 'Guest';
    //const greeting = require('./lang/en/en').greeting;
    const { greeting, serverMessage } = require('./lang/en/en')

    const currentDate = getDate();
    const message = `<span style="color: blue;">${greeting} ${name}, ${serverMessage} ${currentDate}</span>`;
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(message);
} else if (parsedUrl.pathname === '/COMP4537/labs/3/writeFile/') {
    const text = parsedUrl.query.text || '';
    const fileName = 'file.txt';

    fs.appendFileSync(fileName, `${text}\n`);

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Text appended to file.');
} else if (parsedUrl.pathname === '/COMP4537/labs/3/readFile/file.txt') {
    const fileName = 'file.txt';

    try {
        const fileContent = fs.readFileSync(fileName, 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(fileContent);
    } catch (error) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end(`File not found: ${fileName}`);
    }
} else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
}
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Add this line to continuously log messages
console.log('Server is listening...');
