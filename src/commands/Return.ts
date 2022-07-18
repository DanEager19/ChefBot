import { SlashCommandBuilder } from "@discordjs/builders";
const axios = require('axios')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('return')
        .setDescription('Return an item based on order ID.')
        .addIntegerOption((option) => option.setName('id').setDescription('Enter item ID.')),
    async execute(interaction:any) {
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
                console.log(`[X] - ${e.response.data}`);
            });
    }
}