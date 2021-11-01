require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

const cook = 'Cooking';
const garden =  'Gardening';
const announcements = '785949800986181724'

let meetings = {
    section: new String,
    week: 0,
    day: 'Thursday',
    time: '6PM',
    location: 'EH100'
}

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}.`)
})

client.on("messageCreate", msg => {
    if (msg.content === "ping") {
        msg.reply("pong")
    } else if (msg.content === "time") {
        meetings.time = msg.content;
        msg.channel.send(`Time updated to ${meetings.time}`)
        .catch(console.error)
    }
})
client.login(process.env.BOT_TOKEN)