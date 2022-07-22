import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import dotenv from 'dotenv';
dotenv.config()
const axios = require('axios')

export const Reserve = {
    data: new SlashCommandBuilder()
        .setName('reserve')
        .setDescription('Reserve an item based on ID.')
        .addIntegerOption((option) => option.setName('id').setDescription('Enter item ID.'))
        .addStringOption((option) => option.setName('email').setDescription('Enter your email.')),
    async execute(interaction: CommandInteraction) {
        axios.post(`http://${process.env.EXPRESS_SERVER}/reserve`, {
                itemId: interaction.options.getInteger('id'),
                email: interaction.options.getString('email')
            })
            .then(async(res: any) => {
                const content = res.data;
                console.log(`[+] - ${interaction.user.tag} made a reservatin.`)
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