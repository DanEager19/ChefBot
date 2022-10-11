import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

export const AttendanceHistory = {
    data: new SlashCommandBuilder()
        .setName('attendancehistory')
        .setDescription('List previously attended meetings.'),
    async execute(interaction: CommandInteraction) {
        const member = interaction.guild?.members.cache
            .find((member: { id: string; }) => member.id === interaction.user.id);
        
    } 
}