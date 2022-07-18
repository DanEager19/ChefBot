import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
	data: new SlashCommandBuilder()
        .setName('react')
        .setDescription('Allows for member reactions'),
	async execute(interaction: any) {
        if (interaction.user.bot) return;
        const content = 'Done!';
        await interaction.reply({content, ephemeral: true})
        const sentMessage = await interaction.channel.send('React to this!');

        await sentMessage.react('👍');

        const filter = (reaction: { emoji: { name: string; }; }, user: { bot: any; }) => reaction.emoji.name === '👍' && !user.bot;

        const collector = sentMessage.createReactionCollector({
            filter,
            max: 1
        });

        collector.on('collect', (reaction: { emoji: { name: any; }; }, user: any) => {
            console.log(`Collected a new ${reaction.emoji.name} reaction`);
        });

        collector.on('end', (collected: any, reason: string) => {

        if (reason === 'limit')
            return interaction.channel.send(`We've just reached the maximum of reactions.`);
        });
    
    },
};