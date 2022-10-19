import { SlashCommandBuilder } from "@discordjs/builders";
const axios = require('axios')

export const Attend = {
    data: new SlashCommandBuilder()
        .setName('attend')
        .setDescription('Attend a meeting.'),
    async execute(interaction: any) {
        const d = new Date();
        const member = interaction.guild?.members.cache
            .find((member: { id: string; }) => member.id === interaction.user.id);

        if (d.getDay() !== 3) {
            await interaction.reply({
                content: 'It\'s not the specified meeting day silly!',
                ephemeral: true
            });
        } else if (d.getHours() !== 18) {
            await interaction.reply({
                content: 'It\'s not the specified meeting time silly!',
                ephemeral: true
            });
        } else {
            const usertag = `${member?.user.username}#${member?.user.discriminator}`;

            await axios.post(`http://${process.env.EXPRESS_SERVER}/info`, {
                userId: member.user.id,
                userTag: usertag,
            })
            .then(async (res: any) => {
                if(res.status === 403) {
                    const content = `You can\'t attend a meeting twice silly!!`;
                    console.log(`[x] - ${usertag} tried to attend a meeting twice.`)
                    await interaction.reply({
                        content: content,
                    })
                } else {
                    if (res.status === 200) {
                        console.log(interaction)
                        const role = interaction.member.guild.roles.cache.find((r: { id: string; }) => r.id === '785951644457631744');
                        member.roles.add(role);
                        console.log(`[+] - Added the ${role} role to ${usertag}.`);   
                    }

                    await axios.post(`http://${process.env.EXPRESS_SERVER}/attend`, {
                        userId: member.user.id,
                        userTag: usertag,
                    })
                    .then(async (res: any) => {
                        const content = `${usertag} attended today\'s meeting!`;
                        console.log(`[~] - ${usertag} attended a meeting on ${d.toString().slice(0,10)}.`)
                        await interaction.reply({
                            content: content,
                        })
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
}