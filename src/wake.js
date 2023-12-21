const express = require('express');
const app = express();
const port = 3000

const { engine } = require('express-handlebars');

const { logging } = require('./lib/logging/morgan')
const { routes } = require('./routes/router')
const fallbackHandler = require('./handler/fallback/fallbackHandler');
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
app.use(routes)



//-- application running --//
function startServer(port) {
    app.listen(port, () => {
        console.log(
            `Express ${app.get('env')} mode started on http://localhost:${port};`,
            `\npress Ctrl-C to terminate.`
        )
    })
}

if(require.main === module) {
    startServer(process.env.PORT || port)
} else {
    module.exports = startServer
}