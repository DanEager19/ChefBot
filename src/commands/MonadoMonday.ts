import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";;
const axios = require('axios')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('monadomonday')
        .setDescription('Returns monado monday.'),
    async execute(interaction:any) {
        const content = '<@87229746663931904> \nhttps://youtu.be/4Y0Z1GxtfkU';
        await interaction.reply({
            content
        });
    }
        
}
