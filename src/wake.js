const express = require('express');
const app = express();
const port = 3000

const { logging } = require('./lib/logging/morgan')
const fallbackHandler = require('./handler/fallback/fallbackHandler');
const { engine } = require('express-handlebars');
require('./lib/mongo/db')


//-- view setting --//
app.engine('.hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
    helpers: {
        section: function (name, options) {
            if (!this._sections) this._sections = {}
            this._sections[name] = options.fn(this)
            return null
        },
    }
}))
app.set('view engine', '.hbs');


//-- application setting --//
logging(app)


//-- routing --//
app.get('/', function (req, res) {
    res.render('404')
})

app.use(fallbackHandler.notFound)
app.use(fallbackHandler.serverError)


//-- application running --//
app.listen(port);