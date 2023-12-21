const express = require('express');
const app = express();
const port = 3000

const { logging } = require('./lib/logging/morgan')
const fallbackHandler = require('./handler/fallback/fallbackHandler')
require('./lib/mongo/db')


//-- application setting --//
logging(app)


//-- routing --//
app.get('/', function (req, res) {
    res.send('Hello World')
})

app.use(fallbackHandler.notFound)
app.use(fallbackHandler.serverError)


//-- application running --//
app.listen(port);