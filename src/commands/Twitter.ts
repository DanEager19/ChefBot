import { CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from '@discordjs/builders';

export = {
    data: new SlashCommandBuilder()
        .setName('twitter')
        .setDescription('Returns Cooking/Gardening club twitter'),
    async execute(interaction: CommandInteraction) {
        const content = '<twitter>'
        await interaction.reply({
            ephemeral: true,
            content
        });
    }   
}