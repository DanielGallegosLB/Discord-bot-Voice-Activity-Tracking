const client = require('..');
const voiceClient = require('../Client/VoiceClient.js');

client.on('voiceStateUpdate', (oldState, newState) => {
    voiceClient.startListener(oldState, newState);
});