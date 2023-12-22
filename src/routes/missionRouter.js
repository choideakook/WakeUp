const express = require('express');
const router = express.Router();

const missionHandler = require('../handlers/mission/missionHandler')

router.get('/', missionHandler.main)

module.exports = { missionRouter: router }