require('./deploy-commands.js');
const { Client, Intents, Collection } = require('discord.js');
const { token } = require('./config.json');
const fs = require('node:fs');

exports.client = new Client({ intents: [Intents.FLAGS.GUILDS] });

this.client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	this.client.commands.set(command.data.name, command);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		this.client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		this.client.on(event.name, (...args) => event.execute(...args));
	}
}

this.client.login(token);