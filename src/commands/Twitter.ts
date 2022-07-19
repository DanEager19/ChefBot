const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('twitter')
        .setDescription('Returns Cooking/Gardening club twitter'),
    async execute(interaction:any) {
        const content = '<twitter>'
        await interaction.reply({
            ephemeral: true,
            content
        });
    }   
}