const express = require('express');
const app = express();
const port = 3000

const { logging } = require('./lib/logging/morgan')
require('./lib/mongo/db')


//-- application setting --//
logging(app)


//-- routing --//
app.get('/', function (req, res) {
    res.send('Hello World')
})


//-- application running --//
app.listen(port);