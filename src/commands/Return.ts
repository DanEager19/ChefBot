import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import dotenv from 'dotenv';
dotenv.config()
const axios = require('axios')

export const Return = {
    data: new SlashCommandBuilder()
        .setName('return')
        .setDescription('Return an item based on order ID.')
        .addIntegerOption((option) => option.setName('orderid').setDescription('Enter order ID.')),
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
            axios.post(`http://${process.env.EXPRESS_SERVER}/return`, {
                    id: interaction.options.getInteger('orderid')
                })
                .then(async(res: any) => {
                    const content = res.data;
                    console.log(`[-] - ${interaction.user.tag} returned an item.`)
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