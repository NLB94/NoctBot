const {
    readdirSync
} = require("fs");
const functions = require('./loader');
const chalk = require('chalk');

const loadCommands = functions.loadCommands = (client, dir = __dirname.slice(0, (__dirname.length - 4)) + "/commands") => {
    console.log(`${chalk.red('Commandes chargées !')}`);
    readdirSync(dir).forEach(dirs => {
        const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));

        console.log(chalk.green(dirs))
        for (const file of commands) {
            const getFileName = require(`${dir}/${dirs}/${file}`);
            client.commands.set(getFileName.help.name, getFileName);
            // console.log(`${chalk.blue(getFileName.help.name)}`);
        };
    });
};

const loadEvents = functions.loadEvents = (client, dir = __dirname.slice(0, (__dirname.length - 4)) + "/events") => {
    console.log(`${chalk.red('Evènement chargés !')} : `)
    readdirSync(dir).forEach(dirs => {
        const events = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));

        console.log(chalk.green(dirs))
        for (const event of events) {
            const evt = require(`${dir}/${dirs}/${event}`);
            const evtName = event.split(".")[0];
            client.on(evtName, evt.bind(null, client));
            // console.log(`${chalk.blue(evtName)}`);
        };
    });

};

module.exports = {
    loadCommands,
    loadEvents
}