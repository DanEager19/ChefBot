import { SlashCommandBuilder } from "@discordjs/builders";
const axios = require('axios')

export const Register = {
    data: new SlashCommandBuilder()
        .setName('registerattendance')
        .setDescription('Register for Attendance')
        .addStringOption((option) => option.setName('name').setDescription('Enter your full name').setRequired(true))
        .addStringOption((option) => option.setName('email').setDescription('Enter your email.').setRequired(true)),
    async execute(interaction: any) {
        const member = interaction.guild?.members.cache
            .find((member: { id: string; }) => member.id === interaction.user.id);

        const usertag = `${member?.user.username}#${member?.user.discriminator}`;

        axios.post(`http://${process.env.EXPRESS_SERVER}/register`, {
                    userId: member.user.id,
                    userTag: usertag,
                    name: interaction.option.name,
                    email: interaction.option.email,
                })
                .then(async(res: any) => {
                    console.log(`[+] - ${usertag} registered for attendance!`);
                    const content = res.data;
                    await interaction.reply({
                        content
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