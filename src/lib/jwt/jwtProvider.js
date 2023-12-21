const jwt = require('jsonwebtoken');
const crypto = require('crypto')

const {jwt_option} = require('../../.credentails/development.json')

const secretKeyPlain = jwt_option.secret_key
let cachedSecretKey;

function _getSecretKey() {
    return crypto.createHash('sha256')
        .update(secretKeyPlain, 'utf-8')
        .digest('base64');
}

function getSecretKey() {
    if (!cachedSecretKey) cachedSecretKey = _getSecretKey()
    return cachedSecretKey;
}

exports.getToken = (claims, expireIn) => {
    return jwt.sign(claims, getSecretKey(), {
        algorithm: 'HS512',
        expireIn
    })
}

exports.getClaims = (token) => {
    try {
        return jwt.verify(token, getSecretKey(), {
            algorithm: ['HS512']
        });
    } catch (err) {
        const error = new Error(err)
        error.statusCode = 401
        throw error
    }
}