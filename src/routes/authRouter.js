const express = require('express');
const router = express.Router();

const authHandler = require('../handlers/auth/authHandler')

router.get('/kakao', authHandler.login)

module.exports = { authRouter: router }