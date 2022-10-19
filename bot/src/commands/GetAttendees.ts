import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";
import dotenv from 'dotenv';
dotenv.config()
const axios = require('axios')

export const GetAttendees = {
    data: new SlashCommandBuilder()
        .setName('getattendees')
        .setDescription('Returns all current registered attendees.'),
    async execute(interaction: CommandInteraction) {
        axios.get(`http://${process.env.EXPRESS_SERVER}/history`)
            .then(async(res: any) => {
                const embededList = new MessageEmbed().setTitle('Registered Attendees');
                const rows: any = res.data;

                for (let row of rows) {
                    embededList.addField(`${row.name}`, `Usertag: ${row.usertag}\nEmail: ${row.email}\nMeetings Attended: ${row.meetingsattended}`);
                }

                console.log(`[~] - ${interaction.user.tag} requested all attendees.`)
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