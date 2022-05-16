// Sharding manager creation

const { DateTime } = require('luxon');
const colors = require('colors');
const { ShardingManager } = require('discord.js');
const { token } = require('./config.json');
const manager = new ShardingManager('./bot.js', { token: `${token}` });

colors.setTheme({
	time: 'red',
	debug: 'green',
	commands: 'blue',
	bot: 'yellow',
	interaction: 'magenta',
});

manager.on('shardCreate', shard => console.log('['.time + DateTime.now().toFormat('D TT').time + '] '.time + '[SHARDS] '.debug + `Launched shard ${shard.id}`));

manager.spawn();