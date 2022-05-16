const { DateTime } = require('luxon');
const colors = require('colors');

colors.setTheme({
	time: 'red',
	debug: 'green',
	commands: 'blue',
	bot: 'yellow',
	interaction: 'magenta',
});

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		const guilds = client.guilds.cache.map(guild => guild.id);
		console.log('['.time + DateTime.now().toFormat('D TT').time + '] '.time + '[BOT] '.bot + `Ready! Logged in as ${client.user.tag}`);
		console.log('['.time + DateTime.now().toFormat('D TT').time + '] '.time + '[BOT] '.bot + `Bot running on the following guilds: ${guilds}`);
	},
};