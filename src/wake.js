const express = require('express');
const app = express();
const port = 3000

require('./lib/mongo/db')

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(port);