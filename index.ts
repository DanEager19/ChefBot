require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client();

const cook = 'Cooking';
const garden =  'Gardening';
const announcements = '785949800986181724'
//Create the meeting object
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

client.on("message", msg => {
    if (msg.content === "ping") {
        msg.reply("pong")
    }
})
client.login(process.env.BOT_TOKEN)