import { MessageEmbed } from "discord.js";

const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios')

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