exports.notFound = (req, res) => {
    res.render('fallback/404', { url: req.originalUrl})
}

exports.serverError = (err, req, res, next) => {
    switch (err.status) {
        case 401 :
            res.send('401 :', err)
            break
        default :
            res.render('fallback/500', { err : err })
            break
    }
}