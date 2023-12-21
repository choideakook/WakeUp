exports.notFound = (req, res) => {
    res.render('fallback/404', { url: req.originalUrl})
}

exports.serverError = (err, req, res, next) => {
    console.error('err :', err)
    res.render('fallback/500', { err : err })
}