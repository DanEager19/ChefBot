import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
const axios = require('axios')

export const Attend = {
    data: new SlashCommandBuilder()
        .setName('attend')
        .setDescription('Attend a meeting.'),
    async execute(interaction: any) {
        const d = new Date();
        const member = interaction.guild?.members.cache
            .find((member: { id: string; }) => member.id === interaction.user.id);

        if (d.getDay() !== 3) {
            await interaction.reply({
                content: 'It\'s not the specified meeting day silly!',
                ephemeral: true
            });
        } else if (d.getHours() !== 18) {
            await interaction.reply({
                content: 'It\'s not the specified meeting time silly!',
                ephemeral: true
            });
        } else {
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

            axios.post(`http://${process.env.EXPRESS_SERVER}/attend`, {
                    userId: member.user.id,
                    userTag: usertag,
                })
                .then(async(res: any) => {
                    console.log(`[+] - ${usertag} attended a meeting on ${d}.`)
                    await interaction.reply({
                        content: `${usertag} attended today\'s meeting!`,
                    })
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
}