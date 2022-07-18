import { SlashCommandBuilder } from "@discordjs/builders";
const axios = require('axios')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('additem')
        .setDescription('Add an item into inventory.')
        .addStringOption((option) => option.setName('name').setDescription('Enter item name.'))
        .addStringOption((option) => option.setName('description').setDescription('Enter item description.'))
        .addIntegerOption((option) => option.setName('inventory').setDescription('Enter item inventory.')),
    async execute(interaction:any) {
        axios.post('http://localhost:3000/items', {
                name: interaction.options.getString('name'),
                description: interaction.options.getString('description'),
                inventory: interaction.options.getInteger('inventory')
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