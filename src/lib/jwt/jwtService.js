const jwtProvider = require('./jwtProvider');

const userQueryService = require('../../services/user/userQueryService')

const ATK_EXPIRE_IN = '5m';
const RTK_EXPIRE_IN = '7m';

function createAtk(user) {
    const claims = {
        _id: user._id,
        username: user.username
    }
    return jwtProvider.getToken(claims, ATK_EXPIRE_IN)
}

function createRtk(username) {
    const claims = {
        username: username
    }
    return jwtProvider.getToken(claims, RTK_EXPIRE_IN)
}

exports.createToken = (user) => {
    return {
        atk: createAtk(user),
        rtk: createRtk(user.username)
    }
}

exports.getUser = (atk) => {
    const claims = jwtProvider.getClaims(atk)
    return userQueryService.findByUsername(claims.username)
}