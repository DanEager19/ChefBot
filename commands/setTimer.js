const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('util').promisify(setTimeout);;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('timer')
		.setDescription('Sets a timer'),
	async execute(interaction) {
		await interaction.reply('Pong!');
		await wait(2000);
		await interaction.followUp('Pong Again!');
	},
};