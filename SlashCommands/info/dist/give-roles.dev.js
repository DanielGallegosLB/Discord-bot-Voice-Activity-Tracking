"use strict";

var _require = require("discord.js"),
    Client = _require.Client,
    CommandInteraction = _require.CommandInteraction,
    User = _require.User;

var voiceClient = require('../../Client/VoiceClient.js');

var _require2 = require('../../config.json'),
    mongooseConnectionString = _require2.mongooseConnectionString;

var _require3 = require("mongodb"),
    MongoClient = _require3.MongoClient;

module.exports = {
  name: "dar-roles",
  description: "Da los roles a los usuarios que cumplan con las horas de voz",
  type: 'CHAT_INPUT',

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: function run(client, interaction, args) {
    var client_mongo, db, collection, cursors, voz2role, voz5role, voz30role, voz50role;
    return regeneratorRuntime.async(function run$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dosHoras = 7200000;
            cincoHoras = 18000000;
            treintaHoras = 108000000;
            cincuentaHoras = 180000000;
            cienHoras = 360000000;
            docientasHoras = 720000000; // Dar rol a los usuarios cuando superen las 2 horas de voz
            // Mongoose conect

            client_mongo = new MongoClient(mongooseConnectionString);
            _context.next = 9;
            return regeneratorRuntime.awrap(client_mongo.connect());

          case 9:
            db = client_mongo.db("test"); // ***** Obtener datos de voz de cada usuario

            collection = db.collection("djs-voice-users");
            cursors = collection.find();
            console.log("cursors" + cursors); // Referencia a servidor

            serverGuild = interaction.guild;
            console.log("serverGuild: " + serverGuild); // Referencia a rol

            voz2role = serverGuild.roles.cache.find(function (role) {
              return role.name === '🎇Voz [2+hr]';
            });
            voz5role = serverGuild.roles.cache.find(function (role) {
              return role.name === '💫Voz [5+hrs]';
            });
            voz30role = serverGuild.roles.cache.find(function (role) {
              return role.name === '✨Voz [30+hrs]';
            });
            voz50role = serverGuild.roles.cache.find(function (role) {
              return role.name === '🌟Voz [50+hrs]';
            }); // Recorrer cada usuario

            _context.next = 21;
            return regeneratorRuntime.awrap(cursors.forEach(function (cursor) {
              // obtener el usuario
              member = serverGuild.members.cache.get(cursor.User);
              if (member == null) return; // si el usuario no esta en el servidor

              console.log("User: " + member.displayName);

              if (cursor.Time >= dosHoras && cursor.Time < cincoHoras) {
                member.roles.add(voz2role);
                console.log("Se a\xF1ade ".concat(voz2role.name, " a ").concat(member.displayName));
                member.roles.remove(voz5role);
                member.roles.remove(voz30role);
                member.roles.remove(voz50role);
              } else if (cursor.Time >= cincoHoras && cursor.Time < treintaHoras) {
                member.roles.add(voz5role);
                console.log("Se a\xF1ade ".concat(voz5role.name, " a ").concat(member.displayName));
                member.roles.remove(voz2role);
                member.roles.remove(voz30role);
                member.roles.remove(voz50role);
              } else if (cursor.Time >= treintaHoras && cursor.Time < cincuentaHoras) {
                member.roles.add(voz30role);
                console.log("Se a\xF1ade ".concat(voz30role.name, " a ").concat(member.displayName));
                member.roles.remove(voz2role);
                member.roles.remove(voz5role);
                member.roles.remove(voz50role);
              } else if (cursor.Time >= cincuentaHoras) {
                member.roles.add(voz50role);
                console.log("Se a\xF1ade ".concat(voz50role.name, " a ").concat(member.displayName));
                member.roles.remove(voz2role);
                member.roles.remove(voz5role);
                member.roles.remove(voz30role);
              } else {
                console.log("No se a\xF1ade rol a ".concat(member.displayName));
              }
            }));

          case 21:
            //                                        ws = websocket
            interaction.followUp({
              content: "Roles entregados excitosamente!"
            });

          case 22:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};
/*
// Schema
const testSchema = new mongoose.Schema({
    _id: String,
    User: String,
    Time: Number,
    Guild: String,
    __v: Number
    });
console.log(testSchema);
// Model
const test = mongoose.model('test', testSchema);
console.log(test);

const article = await test.find({Guild: '311402172820619274'});
console.log(article);
*/

/*
// client.user = bot
User = interaction.member
serverGuild = interaction.guild 

const userData = await voiceClient.getUserData({guild: serverGuild, user: User});

// interaction = command
// interaction.member = user
interaction.followUp({ 
content: `client.user: ${client.user} 

interaction.member: ${interaction.member.id}
interaction.member.guild: ${interaction.member.guild}

interaction.guild: ${interaction.guild} 
voz2role: ${voz2role}
`});
*/

/*
const Guild = interaction.guild;
console.log(Guild);
const User = client;
console.log(User);
const Member = interaction.member;
console.log(Member);
console.log(voz2role);
const userData = voiceClient.getUserData({guild: Guild, user: User});
if (userData.Time >= 7200000) {
User.roles.add(voz2role);
} else {
User.roles.remove(voz2role);
}
*/