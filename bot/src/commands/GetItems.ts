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
                
                console.log(`[~] - ${interaction.user.tag} requested all items.`)
                await interaction.reply({
                    embeds: [embededList]
                });
            })
            .catch(async (e: any) => {
                let content: any;
                e.response ? content = e.response.data : content = e.toString();
                console.log(`[x] - ${content}`);
                await interaction.reply({
                    content
                });
            });
    
    }   
}