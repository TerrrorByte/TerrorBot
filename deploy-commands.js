const { clientId, token } = require('./config.json');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
const commandPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

console.log('[COMMANDS] Started refreshing application (/) commands.');

(async () => {
	try {

		await rest.put(Routes.applicationCommands(clientId), { body: commands })
			.then(() => console.log('[COMMANDS] Successfully reloaded application (/) commands.'))
			.catch(console.error);

	}
	catch (error) {
		console.error(error);
	}
})();