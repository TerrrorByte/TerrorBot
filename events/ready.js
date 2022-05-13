module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		const guilds = client.guilds.cache.map(guild => guild.id);
		console.log(`[BOT] Ready! Logged in as ${client.user.tag}`);
		console.log(`[BOT] Bot running on the following guilds: ${guilds}`);
	},
};