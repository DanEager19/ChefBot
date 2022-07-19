export = {
	name: 'interactionCreate',
	execute(interaction:any) {
		console.log(`[~] - beep ${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
	},
};