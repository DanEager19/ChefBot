import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";
import dotenv from 'dotenv';
dotenv.config()
const axios = require('axios')

export const GetReservations = {
    data: new SlashCommandBuilder()
        .setName('getreservations')
        .setDescription('Returns all current reservations.'),
    async execute(interaction: CommandInteraction) {
        axios.get(`http://${process.env.EXPRESS_SERVER}/reserve`)
            .then( async(res: any) => {
                const embededList = new MessageEmbed().setTitle('Current Reservations');
                const rows: any = res.data;

                for (let row of rows) {
                    const startdate = row.startdate.slice(0,10)
                    const enddate = row.enddate.slice(0,10)
                    embededList.addFields({
                        name: `${row.email}`, 
                        value: `ID: ${row.id}\nItem: ${row.itemname}\nStart Date: ${startdate}\nEnd Date: ${enddate}\nReturned? ${row.returned}`
                    });
                }

                console.log(`[~] - ${interaction.user.tag} requested all reservations.`)
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