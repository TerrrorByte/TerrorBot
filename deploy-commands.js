const { clientId, token } = require('./config.json');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { DateTime } = require('luxon');

const fs = require('node:fs');
const path = require('node:path');
const colors = require('colors');

colors.setTheme({
	time: 'red',
	debug: 'green',
	commands: 'blue',
	bot: 'yellow',
	interaction: 'magenta',
});

const commands = [];
const commandPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

console.log('['.time + DateTime.now().toFormat('D TT').time + '] '.time + '[COMMANDS] '.commands + 'Started refreshing application (/) commands.');

(async () => {
	try {

		await rest.put(Routes.applicationCommands(clientId), { body: commands })
			.then(() => console.log('['.time + DateTime.now().toFormat('D TT').time + '] '.time + '[COMMANDS] '.commands + 'Successfully reloaded application (/) commands.'))
			.catch(console.error);

	}
	catch (error) {
		console.error(error);
	}
})();