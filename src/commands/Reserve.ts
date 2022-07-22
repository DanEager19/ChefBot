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
        const member = interaction.guild?.members.cache
            .find((member: { id: string; }) => member.id === interaction.user.id);

        const memberRole = member?.roles.cache.get('785951644457631744');

        if(typeof(memberRole) === 'undefined' ) {
            const content = 'Sorry! You don\'t have access to this command!';
            console.log(`[x] - ${interaction.user.tag} tried to use the reserve command.`);
            await interaction.reply({
                content,
                ephemeral: true
            });
        } else {
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
                    e.response ? content = e.response.data : content = e.toString();
                    console.log(`[x] - Error: ${content}`);
                    await interaction.reply({
                        content
                    });
                });
        }
    }
        
}