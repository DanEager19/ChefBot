require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

const cook = 'Cooking';
const garden = 'Gardening';

let meetings = {
    section: new String,
    week: 0,
    time: '6PM',
    location: 'Science Center 121'
}

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}.`)
})

client.on("messageCreate", msg => {
    const weekly = setInterval( () => {
        const timeNow = new Date().getTime
        console.log(`The time is${timeNow}; the message is being sent...`)
        if(meetings.week % 2 === 0) meetings.section = cook
        else meetings.section = garden
        msg.send(`Meeting today! ${meetings.section} is meeting at ${meetings.time} in ${meetings.location}!`)
        meetings.week++
    }, 604800000)

    if (msg.content.substr(0,1) === '!') {
        switch (msg.content.substr(2)) {
            case 'start':
                async () => weekly 
            case 'time':
                meetings.time = msg.substr(6)
            case 'loc':
                meetings.location = msg.substr(5)
            case 'stop':
                clearInterval(weekly)
        }
    }
})

client.on("error", error =>{
    console.error(`This error occured: ${error}`)
})

client.login(process.env.BOT_TOKEN)