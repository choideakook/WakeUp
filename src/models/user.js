const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    nickname: String,
    img: String,
    email: String,
    provider: String,
    role: [String],
    wallet: {
        cash: Number,
        coin: Number
    },
    createDate: Date
})

const User = mongoose.model('User', userSchema)
module.exports = User