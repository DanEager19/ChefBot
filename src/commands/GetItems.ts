import { BaseCommandInteraction, Client } from "discord.js";
import { Command } from "../command";
const axios = require('axios')

export const GetItems: Command = {
    name: "getitems",
    description: "Returns all available items.",
    type: "CHAT_INPUT",
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        axios.get('http://localhost:3000/items')
            .then( async(res: any) => {
                let content: string = '';
                const rows: any = res.data;

                for (let row of rows) {
                    content += `ID: ${row.id} Name: ${row.name} Description: ${row.description} Inventory: ${row.inventory}\n`;
                }
                
                await interaction.followUp({
                    ephemeral: true,
                    content
                });
            }).catch((e: Error) => {
                console.log(`[E] - ${e}`);
            });
    }
}