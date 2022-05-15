
const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {

    const num = _.random(0, 20);
    console.log(num);

    const greet = _.once(() => {
        console.log('Hello');
    });

    res.setHeader('Content-Type', 'text/html');

    let path = './';
    switch (req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-us':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    fs.readFile(path, (err, data) => {
        if(err) throw err;
        else {
            
            res.end(data);
        }
    });

});

server.listen(3000, 'localhost', () => {
    console.log('Listening on port 3000');
});

