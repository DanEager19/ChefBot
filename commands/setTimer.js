const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const { token } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('timer')
		.setDescription('Sets a timer'),
	async execute(interaction) {
		client.login(token);
		function delay(ms) { 
			return new Promise(resolve => setTimeout(resolve, ms));
		}
		async function timeout() {
			await delay(5000);
			const channel = await client.channels.fetch('889222322819567716');
			await channel.send("My Message");
		}	
		await interaction.reply('Pong!');
		timeout();
	},
};