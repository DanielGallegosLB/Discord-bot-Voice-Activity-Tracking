const { Client, CommandInteraction } = require("discord.js");
const voiceClient = require('../../Client/VoiceClient.js');
module.exports = {
    name: "clasificación-de-voz",
    description: "devuelve el top 10 de usuarios con mas horas de voz",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const embed = await voiceClient.generateLeaderboard({
            message: interaction,
            Top: 10,
        });

        message.channel.send({ embeds: [embed] });
    },
};
