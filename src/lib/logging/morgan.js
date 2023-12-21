const morgan = require('morgan')
const fs = require('fs')

exports.logging = (app) => {
    switch (app.get('env')) {
        case 'development' :
            app.use(morgan('dev'))
            break
        case 'production' :
            // 배포 환경 설정
            app.use(morgan('combined', { stream }))
            break
    }
};