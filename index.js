// implement your API here
const express = require('express');

const port = ('5555');

const server = express();

server.get('/', (req, res) => {
res.send("Hello World from Express")
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});