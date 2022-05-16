const { client } = require('../bot.js');
const colors = require('colors');
const { DateTime } = require('luxon');

colors.setTheme({
	time: 'red',
	debug: 'green',
	commands: 'blue',
	bot: 'yellow',
	interaction: 'magenta',
});

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		console.log('['.time + DateTime.now().toFormat('D TT').time + '] '.time + '[INTERACTION] '.interaction + `${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);

		const command = client.commands.get(interaction.commandName);

		if (!command) return;

		try {
			await command.execute(interaction);
		}
		catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	},
};