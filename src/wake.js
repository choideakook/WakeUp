const express = require('express');
const app = express();
const port = 3000

const { engine } = require('express-handlebars');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const { logging } = require('./lib/logging/morgan')
const { webRouter } = require('./routes/webRouter')
const { authRouter } = require('./routes/authRouter')
const { missionRouter } = require('./routes/missionRouter')
const { fallbackRouter } = require('./routes/fallbackRouter')
const { secret } = require('./.credentails/development.json')
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
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser(secret.cookie))



//-- routing --//
app.use('/', webRouter)
app.use('/api/auth', authRouter)
app.use('/api/mission', missionRouter)
app.use(fallbackRouter)



//-- application running --//
function startServer(port) {
    app.listen(port, () => {
        console.log(
            `Express ${app.get('env')} mode started on http://localhost:${port};`,
            `\npress Ctrl-C to terminate.`
        )
    })
}
if(require.main === module)
    startServer(process.env.PORT || port)
else
    module.exports = startServer