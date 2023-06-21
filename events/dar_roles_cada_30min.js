const { Client, CommandInteraction, User } = require("discord.js");
const { mongooseConnectionString } = require('../config.json')
const {MongoClient} = require("mongodb");
const client = require("../index");

module.exports = {
        async assignRoles(client){
        dosHoras = 7200000
        cincoHoras = 18000000 
        treintaHoras = 108000000 
        cincuentaHoras= 180000000 
        cienHoras = 360000000 
        docientasHoras = 720000000 
         // Dar rol a los usuarios cuando superen las 2 horas de voz
         
         try {
         // Mongoose conect
         const client_mongo = new MongoClient(mongooseConnectionString);
         await client_mongo.connect();
         const db = client_mongo.db("test")
         // ***** Obtener datos de voz de cada usuario
         const collection = db.collection("djs-voice-users")
         const cursors = collection.find();
         // Referencia a servidor
         serverGuild = client.guilds.cache.get("311402172820619274");
         // Referencia a rol
         let voz2role = serverGuild.roles.cache.find(role => role.name === '🎇Voz [2+hr]');
         let voz5role = serverGuild.roles.cache.find(role => role.name === '💫Voz [5+hrs]');
         let voz30role = serverGuild.roles.cache.find(role => role.name === '✨Voz [30+hrs]');
         let voz50role = serverGuild.roles.cache.find(role => role.name === '⭐Voz [50+hrs]');
         let voz100role = serverGuild.roles.cache.find(role => role.name === '🌟Voz [100+hrs]');
         let voz200role = serverGuild.roles.cache.find(role => role.name === '🌟🌟Voz [200+hrs]');

         // Recorrer cada usuario
         await cursors.forEach(cursor => {
            // obtener el usuario
            const member = serverGuild.members.cache.get(cursor.User)
            if (member == null) return; // si el usuario no esta en el servidor
            //console.log("User: "+member.displayName);
            if (cursor.Time >= dosHoras && cursor.Time < cincoHoras){
                member.roles.add(voz2role);
                console.log(`Se añade ${voz2role.name} a ${member.displayName}`)
                member.roles.remove(voz5role);
                member.roles.remove(voz30role);
                member.roles.remove(voz50role);
                member.roles.remove(voz100role);
            } else if (cursor.Time >= cincoHoras && cursor.Time < treintaHoras){
                member.roles.add(voz5role);
                console.log(`Se añade ${voz5role.name} a ${member.displayName}`)
                member.roles.remove(voz2role);
                member.roles.remove(voz30role);
                member.roles.remove(voz50role);
                member.roles.remove(voz100role);
            } else if (cursor.Time >= treintaHoras && cursor.Time < cincuentaHoras){
                member.roles.add(voz30role);
                console.log(`Se añade ${voz30role.name} a ${member.displayName}`)
                member.roles.remove(voz2role);
                member.roles.remove(voz5role);
                member.roles.remove(voz50role);
                member.roles.remove(voz100role);
            } else if (cursor.Time >= cincuentaHoras && cursor.Time < cienHoras){
                member.roles.add(voz50role);
                console.log(`Se añade ${voz50role.name} a ${member.displayName}`)
                member.roles.remove(voz2role);
                member.roles.remove(voz5role);
                member.roles.remove(voz30role);
                member.roles.remove(voz100role);
            } else if (cursor.Time >= cienHoras && cursor.Time < docientasHoras ){ 
                member.roles.add(voz100role);
                console.log(`Se añade ${voz100role.name} a ${member.displayName}`)
                member.roles.remove(voz2role);
                member.roles.remove(voz5role);
                member.roles.remove(voz30role);
                member.roles.remove(voz50role);
                member.roles.remove(voz200role);
            } else if (cursor.Time >= docientasHoras ){
                member.roles.add(voz200role);
                console.log(`Se añade ${voz200role.name} a ${member.displayName}`)
                member.roles.remove(voz2role);
                member.roles.remove(voz5role);
                member.roles.remove(voz30role);
                member.roles.remove(voz50role);
                member.roles.remove(voz100role);
            } else {
                console.log(`No se añade rol a ${member.displayName}`)
            }            
        });
        client_mongo.close();
    } catch (error) {
        console.log(error);
    }
}};