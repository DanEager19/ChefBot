import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed, CommandInteraction } from "discord.js";
import dotenv from 'dotenv';
dotenv.config()
const axios = require('axios')

export const GetItems = {
    data: new SlashCommandBuilder()
        .setName('getitems')
        .setDescription('Returns all available items.'),
    async execute(interaction: CommandInteraction) {
        axios.get(`http://${process.env.EXPRESS_SERVER}/items`)
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