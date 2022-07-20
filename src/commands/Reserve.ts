import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
const axios = require('axios')

export = {
    data: new SlashCommandBuilder()
        .setName('reserve')
        .setDescription('Reserve an item based on ID.')
        .addIntegerOption((option) => option.setName('id').setDescription('Enter item ID.'))
        .addStringOption((option) => option.setName('email').setDescription('Enter your email.')),
    async execute(interaction: CommandInteraction) {
        axios.post('http://localhost:3000/reserve', {
                itemId: interaction.options.getInteger('id'),
                email: interaction.options.getString('email')
            })
            .then(async(res: any) => {
                const content = res.data;
                await interaction.reply({
                    content
                });
            })
            .catch(async (e: any) => {
                const content = e.response.data;
                await interaction.reply({
                    content
                });
                console.log(`[x] - ${e.response.data}`);
            });
    }
        
}