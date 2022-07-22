import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import dotenv from 'dotenv';
dotenv.config()
const axios = require('axios')

export const Removeitem = {
    data: new SlashCommandBuilder()
        .setName('removeitem')
        .setDescription('Update an item in inventory.')
        .addIntegerOption((option) => option.setName('id').setDescription('Enter item ID.')),
    async execute(interaction: CommandInteraction) {
        axios.delete(`http://${process.env.EXPRESS_SERVER}/items`, {
                id: interaction.options.getInteger('id')
            })
            .then(async(res: any) => {
                const content = res.data;
                console.log(`[-] - ${interaction.user.tag} deleted an item.`)
                await interaction.reply({
                    content
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