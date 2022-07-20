import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
const axios = require('axios')

export = {
    data: new SlashCommandBuilder()
        .setName('updateitem')
        .setDescription('Update an item in inventory.')
        .addIntegerOption((option) => option.setName('id').setDescription('Enter item ID.'))
        .addStringOption((option) => option.setName('name').setDescription('Enter item name.'))
        .addStringOption((option) => option.setName('description').setDescription('Enter item description.'))
        .addIntegerOption((option) => option.setName('inventory').setDescription('Enter item inventory.')),
    async execute(interaction: CommandInteraction) {
        axios.put('http://localhost:3000/items', {
                id: interaction.options.getInteger('id'),
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
                console.log(`[x] - ${e.response.data}`);
            });
    }
}