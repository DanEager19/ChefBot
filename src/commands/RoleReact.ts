import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

export const RoleReact = {
	data: new SlashCommandBuilder()
        .setName('rolereact')
        .setDescription('Allows for member role reactions'),
	async execute(interaction: CommandInteraction) {
        if (interaction.user.bot) return;
        const content = 'Done!';
        await interaction.reply({content, ephemeral: true})

        const text = '**React with an emoji for the corresponding role!**\n\n🍽: `Cooks`\n\n🌱: `Gardeners`\n\n💻: `Social`\n\n☢: `Offtopic`'
        const message = await interaction.channel?.send(text);

        message?.react('🍽')
            .then(() => { message.react('🌱') })
            .then(() => { message.react('💻') })
            .then(() => { message.react('☢') });
    },
};