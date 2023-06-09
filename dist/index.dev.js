"use strict";

var _require = require("discord.js"),
    Client = _require.Client,
    Collection = _require.Collection;

var client = new Client({
  intents: 3276799 //32767

});
module.exports = client; // Global Variables

client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json"); // Initializing the project

require("./handler")(client);

client.login(client.config.token);