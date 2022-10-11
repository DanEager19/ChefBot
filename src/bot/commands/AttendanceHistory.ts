import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
const axios = require('axios')

export const AttendanceHistory = {
    data: new SlashCommandBuilder()
        .setName('attendancehistory')
        .setDescription('List previously attended meetings.'),
    async execute(interaction: any) {
        const member = interaction.guild?.members.cache
            .find((member: { id: string; }) => member.id === interaction.user.id);
        const usertag = `${member?.user.username}#${member?.user.discriminator}`;

        axios.post(`http://${process.env.EXPRESS_SERVER}/history`, {
                userId: member.user.id,
                userTag: usertag,
            })
            .then(async(res: any) => {
                console.log(`[~] - Sent ${usertag} attendance history.`);
                const content = res.data;
                await interaction.reply({
                    content
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