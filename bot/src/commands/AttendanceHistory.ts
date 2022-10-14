import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed, CommandInteraction } from "discord.js";
const axios = require('axios')

export const AttendanceHistory = {
    data: new SlashCommandBuilder()
        .setName('attendancehistory')
        .setDescription('List previously attended meetings.'),
    async execute(interaction: any) {
        const member = interaction.guild?.members.cache
            .find((member: { id: string; }) => member.id === interaction.user.id);
        const usertag = `${member?.user.username}#${member?.user.discriminator}`;

        await axios.post(`http://${process.env.EXPRESS_SERVER}/history`, {
                userId: member.user.id,
                userTag: usertag,
            })
            .then(async(res: any) => {
                let content: string ='';
                const dates: any = res.data.meetingsHistory;

                for (let date of dates) {
                    content += `${date.slice(0,10)}\n`;
                }
                console.log(`[~] - Sent ${usertag} attendance history.`);
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