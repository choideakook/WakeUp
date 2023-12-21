const axios = require('axios')

const userProcessHandler = require('../user/userProcessHandler')
const userQueryService = require('../../services/user/userQueryService')
const jwtService = require('../../lib/jwt/jwtService')
const redisService = require('../../lib/redis/redisService')

const KAKAO_TOKEN_REQ_URL = 'https://kauth.kakao.com/oauth/token'
const KAKAO_TOKEN_DECRYPT_URL = 'https://kapi.kakao.com/v2/user/me'
const {auth} = require('../../.credentails/development.json')

exports.login = async (req, res, next) => {
    const body = {
        client_id: auth.restApiKey,
        grant_type: auth.grant_type,
        redirect_uri: auth.redirectUrl,
        code: req.query.code,
        client_secret: auth.clientSecret
    }
    const header = {
        headers: {"Content-Type": "application/x-www-form-urlencoded"}
    }

    await axios.post(KAKAO_TOKEN_REQ_URL, body, header)
        .then(async response => {
            const header = {
                headers: {
                    "Authorization": `Bearer ${response.data.access_token}`,
                    "Content-type": "application/json"
                }
            }
            await axios.get(KAKAO_TOKEN_DECRYPT_URL, header)
                .then(async response => {
                    const user = await getUser(response.data)
                    const tokens = jwtService.createToken(user)
                    redisService.set(user.username, tokens.rtk)
                    res.cookie("rtk", tokens.rtk)
                    res.json({ 'atk': tokens.atk })
                })
        })
        .catch(err => next(err))
}

async function getUser(userData) {
    const user = await userQueryService.findByUsername(userData.id)

    if (!user)
        return userProcessHandler.join(userData)

    return user;
}