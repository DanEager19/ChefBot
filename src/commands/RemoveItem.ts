import { SlashCommandBuilder } from "@discordjs/builders";
const axios = require('axios')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removeitem')
        .setDescription('Update an item in inventory.')
        .addIntegerOption((option) => option.setName('id').setDescription('Enter item ID.')),
    async execute(interaction:any) {
        axios.delete('http://localhost:3000/items', {
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