const { Client, CommandInteraction, User } = require("discord.js");
const voiceClient = require('../../Client/VoiceClient.js');
const { mongooseConnectionString } = require('../../config.json')
const {MongoClient} = require("mongodb");

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
    run: async (client, interaction, args) => {
        dosHoras = 7200000
        cincoHoras = 18000000 
        treintaHoras = 108000000 
        cincuentaHoras= 180000000 
        cienHoras = 360000000 
        docientasHoras = 720000000 
         // Dar rol a los usuarios cuando superen las 2 horas de voz
         
         // Mongoose conect
         const client_mongo = new MongoClient(mongooseConnectionString);
         await client_mongo.connect();
         const db = client_mongo.db("test")
         // ***** Obtener datos de voz de cada usuario
         const collection = db.collection("djs-voice-users")
         const cursors = collection.find();
         console.log("cursors"+cursors);
         // Referencia a servidor
         serverGuild = interaction.guild 
         console.log("serverGuild: "+serverGuild);
         // Referencia a rol
         let voz2role = serverGuild.roles.cache.find(role => role.name === '🎇Voz [2+hr]');
         let voz5role = serverGuild.roles.cache.find(role => role.name === '💫Voz [5+hrs]');
         let voz30role = serverGuild.roles.cache.find(role => role.name === '✨Voz [30+hrs]');
         let voz50role = serverGuild.roles.cache.find(role => role.name === '🌟Voz [50+hrs]');

         // Recorrer cada usuario
         
         await cursors.forEach(cursor => {
            // obtener el usuario
            member = serverGuild.members.cache.get(cursor.User)
            if (member == null) return; // si el usuario no esta en el servidor
            console.log("User: "+member.displayName);
            if (cursor.Time >= dosHoras && cursor.Time < cincoHoras){
                member.roles.add(voz2role);
                console.log(`Se añade ${voz2role.name} a ${member.displayName}`)
                member.roles.remove(voz5role);
                member.roles.remove(voz30role);
                member.roles.remove(voz50role);
            } else if (cursor.Time >= cincoHoras && cursor.Time < treintaHoras){
                member.roles.add(voz5role);
                console.log(`Se añade ${voz5role.name} a ${member.displayName}`)
                member.roles.remove(voz2role);
                member.roles.remove(voz30role);
                member.roles.remove(voz50role);
            } else if (cursor.Time >= treintaHoras && cursor.Time < cincuentaHoras){
                member.roles.add(voz30role);
                console.log(`Se añade ${voz30role.name} a ${member.displayName}`)
                member.roles.remove(voz2role);
                member.roles.remove(voz5role);
                member.roles.remove(voz50role);
            } else if (cursor.Time >= cincuentaHoras ){
                member.roles.add(voz50role);
                console.log(`Se añade ${voz50role.name} a ${member.displayName}`)
                member.roles.remove(voz2role);
                member.roles.remove(voz5role);
                member.roles.remove(voz30role);
            } else {
                console.log(`No se añade rol a ${member.displayName}`)
            }            
        });
        //                                        ws = websocket
        interaction.followUp({ content: `Roles entregados excitosamente!` });
    },
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
   

