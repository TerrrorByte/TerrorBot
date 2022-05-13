const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('about')
		.setDescription('Information about the TerrorTribe Server'),
	async execute(interaction) {
		await interaction.reply('The TerrorTribe server was founded in 2021 by Twitch streamer, Terr0rByt3, to interact more directly with his community! The server is for general discussion, stream notifications, and just to hang out.');
	},
};