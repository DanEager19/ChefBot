import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
const axios = require('axios')

export = {
    data: new SlashCommandBuilder()
        .setName('return')
        .setDescription('Return an item based on order ID.')
        .addIntegerOption((option) => option.setName('id').setDescription('Enter item ID.')),
    async execute(interaction: CommandInteraction) {
        axios.post('http://localhost:3000/return', {
                id: interaction.options.getInteger('id')
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