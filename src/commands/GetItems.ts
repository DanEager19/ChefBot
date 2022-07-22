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
        const member = interaction.guild?.members.cache
            .find((member: { id: string; }) => member.id === interaction.user.id);
        const officerRole = interaction.guild?.roles.cache
            .find((r: { id: string; }) => r.id === '785951435829149827');
        const adminRole = interaction.guild?.roles.cache
            .find((r: { id: string; }) => r.id === '785964719914614814');

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
                e.response.data ? content = e.response.data : content = e;
                console.log(`[x] - ${content}`);
                await interaction.reply({
                    content
                });
            });
    }
        
}