import { SlashCommandBuilder } from "@discordjs/builders";
import { Base, BaseCommandInteraction} from 'discord.js'

export = {
	data: new SlashCommandBuilder()
        .setName('react')
        .setDescription('Allows for member reactions'),
	async execute(interaction: BaseCommandInteraction) {
        if (interaction.user.bot) return;
        const content = 'Done!';
        await interaction.reply({content, ephemeral: true})

        const text = '**React with a an emoji for the corresponding role!**\n\n🍽: `Cooks`\n\n🌱: `Gardeners`\n\n☢: `Offtopic`\n\n'
        const message = await interaction.channel?.send(text);

        message?.react('🍽')
            .then(() => { message.react('🌱') })
            .then(() => { message.react('☢') });

        const filter = (reaction: any, user: any) => {
            const reactEmoji = reaction.emoji.name;
            return ('🍽' === reactEmoji|| '🌱'=== reactEmoji || '☢' === reactEmoji) && user.id === interaction.user.id;
        }

        const collector = message?.createReactionCollector({ filter });

        collector?.on('collect', async(reaction:any, user:any) => {
            const { guild } = reaction.message 
            const member = guild.members.cache.find((member: { id: any; }) => member.id === user.id);
            if (reaction.emoji.name === '🍽') {
                const role = reaction.message.guild.roles.cache.find((r: { id: string; }) => r.id === '785959812475256832');
                member.roles.add(role);
                console.log(`[~] - Gave ${user.tag} the ${role} role`);
            } else if (reaction.emoji.name === '🌱') {
                const role = reaction.message.guild.roles.cache.find((r: { id: string; }) => r.id === '785959816676900884');
                member.roles.add(role);
                console.log(`[~] - Gave ${user.tag} the ${role} role`);
            } else if (reaction.emoji.name === '☢') {
                const role = reaction.message.guild.roles.cache.find((r: { id: string; }) => r.id === '796871266329165824');
                member.roles.add(role);
                console.log(`[~] - Gave ${user.tag} the ${role} role`);
            }
            console.log(`[+] - Collected ${reaction.emoji.name} from ${user.tag}`);
        });
        
        collector?.on('end', (collected:any) => {
            console.log(`[~] - Collected ${collected.size} items`);
        });
    },
};