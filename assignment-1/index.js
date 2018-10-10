const http = require('http');
const url = require('url');

const PORT = 3000;

const router = {
    hello: {
        response: {
            message: 'Welcome to the awesome API',
            status: 'OK'
        },
        status: 200
    }
};

const notFoundRoute = {
    response: {
        message: 'Not found',
        status: 'ERROR'
    },
    status: 404
};

// create the http server
const server = http.createServer((request, response) => {
    const parsedUrl = url.parse(request.url, true);
    const path = (parsedUrl.path || '').replace(/^\/+|\/+$/g, '');
    const route = router[path] || notFoundRoute;
    const json = JSON.stringify(route.response);

    // send the response
    console.log(`sending response ${json}`);
    response.setHeader('Content-Type', 'application/json');
    response.writeHead(route.status);
    response.end(json);
});

server.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
});
