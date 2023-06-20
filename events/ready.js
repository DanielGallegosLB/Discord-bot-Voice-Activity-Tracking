const { ActivityTypes } = require("discord.js");
const client = require("../index");

client.on("ready", () => {
    console.log(`${client.user.tag} is up and ready to go!`);

    // Set the client user's activity
    client.user.setActivity('mi desarrollo!', { type: 'WATCHING' });
    
});
