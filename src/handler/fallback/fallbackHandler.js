exports.notFound = (req, res) => res.send('404')

exports.serverError = (err, req, res, next) => {
    console.error('err :', err)
    res.send('500')
}