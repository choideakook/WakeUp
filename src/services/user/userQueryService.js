const User = require('../../models/user');

exports.findByUsername = (username) => {
    return User.findOne({ username : username })
}