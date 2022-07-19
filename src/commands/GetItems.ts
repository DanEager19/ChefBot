import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed, BaseCommandInteraction } from "discord.js";
const axios = require('axios')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getitems')
        .setDescription('Returns all available items.'),
    async execute(interaction: BaseCommandInteraction) {
        axios.get('http://localhost:3000/items')
            .then( async(res: any) => {
                const embededList = new MessageEmbed().setTitle('Current Inventory');
                const rows: any = res.data;

                for (let row of rows) {
                    embededList.addField(`${row.name}`, `ID: ${row.id}\nDescription: ${row.description}\nInventory: ${row.inventory}`);
                }

                await interaction.reply({
                    embeds: [embededList]
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