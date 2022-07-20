import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";
const axios = require('axios')

export = {
    data: new SlashCommandBuilder()
        .setName('getreservations')
        .setDescription('Returns all current reservations.'),
    async execute(interaction: CommandInteraction) {
        axios.get('http://localhost:3000/reserve')
            .then( async(res: any) => {
                const embededList = new MessageEmbed().setTitle('Current Reservations');
                const rows: any = res.data;

                for (let row of rows) {
                    embededList.addField(`${row.email}`, `ID: ${row.id}\nItem: ${row.itemname}\nStart Date: ${row.startdate}\nEnd Date: ${row.enddate}\nReturned?: ${row.returned}`);
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
                console.log(`[x] - ${e.response.data}`);
            });
    }
        
}