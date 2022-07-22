import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import dotenv from 'dotenv';
dotenv.config()
const axios = require('axios')

export const UpdateItems = {
    data: new SlashCommandBuilder()
        .setName('updateitem')
        .setDescription('Update an item in inventory.')
        .addIntegerOption((option) => option.setName('id').setDescription('Enter item ID.'))
        .addStringOption((option) => option.setName('name').setDescription('Enter item name.'))
        .addStringOption((option) => option.setName('description').setDescription('Enter item description.'))
        .addIntegerOption((option) => option.setName('inventory').setDescription('Enter item inventory.')),
    async execute(interaction: CommandInteraction) {
        const member = interaction.guild?.members.cache
            .find((member: { id: string; }) => member.id === interaction.user.id);

        const officerRole = member?.roles.cache.get('785951435829149827');
        const adminRole = member?.roles.cache.get('785964719914614814');

        if(typeof(adminRole) === 'undefined' && typeof(officerRole) === 'undefined') {
            const content = 'Sorry! You don\'t have access to this command!';
            console.log(`[x] - ${interaction.user.tag} tried to use the updatetems command.`);
            await interaction.reply({
                content,
                ephemeral: true
            });
        } else {
            axios.put(`http://${process.env.EXPRESS_SERVER}/items`, {
                    id: interaction.options.getInteger('id'),
                    name: interaction.options.getString('name'),
                    description: interaction.options.getString('description'),
                    inventory: interaction.options.getInteger('inventory')
                })
                .then(async(res: any) => {
                    const content = res.data;
                    console.log(`[+] - ${interaction.user.tag} updated an item.`)
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