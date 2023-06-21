const { ActivityTypes } = require("discord.js");
const client = require("../index");
const { assignRoles } = require('../events/dar_roles_cada_30min.js');
const { set } = require("mongoose");

client.on("ready", () => {
    console.log(`${client.user.tag} is up and ready to go!`);

    // Set the client user's activity
    client.user.setActivity('En línea!', { type: 'WATCHING' });
    
    // Ejecutar la función inicialmente 
    //assignRoles(client); // Ejecución inicial

    setInterval(() => {
    console.log("Asignando roles!");
    client.user.setActivity('Asignando Roles!', { type: 'WATCHING' });
    assignRoles(client); // Ejecución cada 30 minutos

    // Al terminar los 5 segundos se vuelve a poner en línea
    setTimeout(function() {
        console.log("A la espera");
        client.user.setActivity('En línea!', { type: 'WATCHING' });
      }, 5000);
      
      
    }, 1800000); // 30 minutos = 1800000 ms

    


    
});
