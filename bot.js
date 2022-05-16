// Main bot
require('./deploy-commands.js');
const fs = require('node:fs');
const path = require('node:path');
const colors = require('colors');
const { DateTime } = require('luxon');

const { Client, Intents, Collection } = require('discord.js');
const { token } = require('./config.json');

module.exports.client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
	],
});

colors.setTheme({
	time: 'red',
	debug: 'green',
	commands: 'blue',
	bot: 'yellow',
	interaction: 'magenta',
});

this.client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

	this.client.commands.set(command.data.name, command);
}


const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);

	if (event.once) {
		this.client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		this.client.on(event.name, (...args) => event.execute(...args));
	}
}


this.client.once('ready', () => {
	console.log('['.time + DateTime.now().toFormat('D TT').time + '] '.time + '[BOT] '.bot + `${this.client.user.tag} is ready`);
});

this.client.login(token);