const fs = require('node:fs');

const { Client, Collection, Intents } = require('discord.js');
const { token } = require('../config.json');
const db = require('./util/database');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Dynamically retrieve command files
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

// Dynmically retrieve all event files
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(db, ...args));
    } else {
        client.on(event.name, (...args) => event.execute(db, ...args));
    }
}

// Dynamically retrieve all select menu files
const selectMenuFolders = fs.readdirSync('./select-menus');

for (const folder of selectMenuFolders) {
    const selectMenuFiles = fs.readdirSync(`./select-menus/${folder}`).filter(file => file.endsWith('.js'));

    for (const file of selectMenuFiles) {
        const selectMenu = require(`./select-menus/${folder}/${file}`);
        client.selectMenus.set(selectMenu.data.name, selectMenu);
    }
}

const buttonFolders = fs.readdirSync('./buttons');

// Dynamically retrieve all button files
for (const folder of buttonFolders) {
    const buttonFiles = fs.readdirSync(`./buttons/${folder}`).filter(file => file.endsWith('.js'));

    for (const file of buttonFiles) {
        const button = require(`./buttons/${folder}/${file}`);
        client.buttons.set(button.data.name, button);
    }
}

client.login(token);