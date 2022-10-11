export const MessageReactionAdd = {
	name: 'messageReactionAdd',
	execute(reaction: any, user: any) {
        const rExp: RegExp = /React with an emoji for the corresponding role!/;
		if (!reaction.message.author.bot || !rExp.test(reaction.message.content) ) return;
        
		const { guild } = reaction.message 
        const member = guild.members.cache.find((member: { id: any; }) => member.id === user.id);
        if (reaction.emoji.name === '🍽') {
            const role = reaction.message.guild.roles.cache.find((r: { id: string; }) => r.id === '785959812475256832');
            member.roles.add(role);
            console.log(`[-] - Added the ${role} role to ${user.tag}.`);
        } else if (reaction.emoji.name === '🌱') {
            const role = reaction.message.guild.roles.cache.find((r: { id: string; }) => r.id === '785959816676900884');
            member.roles.add(role);
            console.log(`[-] - Added the ${role} role to ${user.tag}.`);
        } else if (reaction.emoji.name === '💻') {
            const role = reaction.message.guild.roles.cache.find((r: { id: string; }) => r.id === '999077403299172463');
            member.roles.add(role);
            console.log(`[-] - Added the ${role} role to ${user.tag}.`);
        }  else if (reaction.emoji.name === '☢') {
            const role = reaction.message.guild.roles.cache.find((r: { id: string; }) => r.id === '796871266329165824');
            member.roles.add(role);
            console.log(`[-] - Added the ${role} role to ${user.tag}.`);
        }
	},
};