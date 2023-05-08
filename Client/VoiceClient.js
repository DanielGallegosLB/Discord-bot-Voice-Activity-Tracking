const { VoiceClient } = require('djs-voice')
const client = require('..')
const { mongooseConnectionString } = require('../config.json')

const voiceClient = new VoiceClient({
    allowBots: false,
    client: client,
    debug: true,
    mongooseConnectionString: mongooseConnectionString
})

module.exports = voiceClient;