import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

export = {
    data: new SlashCommandBuilder()
        .setName('monadomonday')
        .setDescription('Returns monado monday.'),
    async execute(interaction: CommandInteraction) {
        const content = '<@87229746663931904> \nhttps://youtu.be/4Y0Z1GxtfkU';
        await interaction.reply({
            content
        });
    }
        
}
