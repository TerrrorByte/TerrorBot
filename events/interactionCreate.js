const { client } = require('../index.js');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		console.log(`[INTERACTION] ${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);

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