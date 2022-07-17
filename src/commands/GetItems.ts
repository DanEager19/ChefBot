import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";;
const axios = require('axios')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getitems')
        .setDescription('Returns all available items.'),
    async execute(interaction:any) {
        axios.get('http://localhost:3000/items')
            .then( async(res: any) => {
                const embededList = new MessageEmbed()
                    .setTitle('Current Inventory');
                const rows: any = res.data;

                for (let row of rows) {
                    embededList.addField(`${row.name}`, `ID: ${row.id}\n Description: ${row.description}\n Inventory: ${row.inventory}\n`)
                }

                await interaction.reply({
                    embeds: [embededList]
                });
            }).catch((e: Error) => {
                console.log(`[X] - ${e}`);
            });
    }
        
}