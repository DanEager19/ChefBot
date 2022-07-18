import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";;
const axios = require('axios')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getreservations')
        .setDescription('Returns all current reservations.'),
    async execute(interaction:any) {
        axios.get('http://localhost:3000/reserve')
            .then( async(res: any) => {
                const embededList = new MessageEmbed()
                    .setTitle('Current Reservations');
                const rows: any = res.data;

                for (let row of rows) {
                    embededList.addField(`${row.email}`, 
                    `ID: ${row.id} 
                        Item: ${row.itemname}
                        Start Date: ${row.startdate} 
                        End Date: ${row.enddate}
                        Returned?: ${row.returned}
                    `)
                }

                await interaction.reply({
                    embeds: [embededList]
                });
            })
            .catch(async (e: any) => {
                const content = e.response.data;
                await interaction.reply({
                    content
                });
                console.log(`[X] - ${e.response.data}`);
            });
    }
        
}