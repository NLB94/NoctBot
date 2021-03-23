const { readdirSync } = require("fs");
const functions = require('./loader');
const chalk = require('chalk');

const loadCommands = functions.loadCommands = (client, dir = "./Bot/commands/") => {
    readdirSync(dir).forEach(dirs => {
        const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
    
        for (const file of commands) {
            const getFileName = require(`../${dir}/${dirs}/${file}`);
            client.commands.set(getFileName.help.name, getFileName);
            console.log(`${chalk.green('Commande chargée')} : ${chalk.blue(getFileName.help.name)}`);
        };
    });
};

const loadEvents = functions.loadEvents = (client, dir = "./Bot/events/") => {
    readdirSync(dir).forEach(dirs => {
        const events = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
 
        for (const event of events) {
            const evt = require(`../${dir}/${dirs}/${event}`);
            const evtName = event.split(".")[0];
            client.on(evtName, evt.bind(null, client));
            console.log(`${chalk.green('Evènement chargé')} : ${chalk.blue(evtName)}`);
        };
    });
};

module.exports = {
    loadCommands,
    loadEvents,
}