//Base code used from https://www.wikihow.com/Create-a-Bot-in-Discord
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
//Creates a HTTP server
require("http").createServer(async (req,res) => { res.statusCode = 200; res.write("ok"); res.end(); }).listen(3000, () => console.log("Now listening on port 3000"));

//Create immutable strings
const cook = 'Cooking';
const garden =  'Gardening';

//Create the meeting object
var meetings = {
    section: new String,
    week: 0,
    date: new Date(),
    day: 'Thursday',
    time: '6PM',
    location: 'EH100'
}

//Base code
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    //Only lets the specified user in the specified channel access controls.
    if (message.substring(0, 1) == '!' && userID == 223248267650007041 && channelID == 889222322819567716) {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        args = args.splice(1);
        switch(cmd) {
            //Starts the countdown
            case 'start':
                console.log('Starting...')
                timer = setInterval(() => {
                    //Checks if the cooking or gardening club meetings based on whether the counter is even or odd. 
                    if (meetings.week % 2 == 0) {
                        meetings.section = garden;
                        meetings.week++;
                        console.log('Meeting counter ' + meetings.week);
                    } else {
                        meetings.section = cook;
                        meetings.week++;
                        console.log('Meeting counter ' + meetings.week);
                    }
                    console.log('Sending reminder...');
                    bot.sendMessage({
                        to: '785949800986181724',
                        message: ('Good Morning @here! Meeting Today! The ' + meetings.section + ' section meets ' + meetings.day + ' at ' + meetings.time + ' in ' + meetings.location + '!')
                    });
                    console.log('Looping...');
                }, 604800000); 
            break;
            //Checks and/or updates the location.
            case 'loc':
                //Checks for empty string                
                if(message.substring(5) == '') {
                    bot.sendMessage({
                        to: channelID,
                        message: ('Location is: ' + meetings.location)
                    });
                } else {
                    //Updates parameter
                    meetings.location = message.substring(5);
                    bot.sendMessage({
                        to: channelID,
                        message: ('Location set to: ' + meetings.location)
                    });
                }
                console.log('Location is currently ' + meetings.location);            
            break;
            //Checks and/or updates the time.
            case 'time':
                //Checks for empty string
                if(message.substring(6) == '') {
                    bot.sendMessage({
                        to: channelID,
                        message: ('Time is: ' + meetings.time)
                    });
                } else {
                    //Updates parameter
                    meetings.time = message.substring(6);
                    bot.sendMessage({
                        to: channelID,
                        message: ('Time set to: ' + meetings.time)
                    });
                }
                console.log('Time is currently ' + meetings.time);
            break;
            //Checks and/or updates the day.
            case 'day':
                //Checks for empty string
                if(message.substring(5) == '') {
                    bot.sendMessage({
                        to: channelID,
                        message: ('Day is: ' + meetings.day)
                    });
                } else {
                    //Updates parameter
                    meetings.day = message.substring(5);
                    bot.sendMessage({
                        to: channelID,
                        message: ('Day set to: ' + meetings.day)
                    });
                }
                console.log('Day is currently ' + meetings.day)
                ;
            break;
            //Sends any additional messages. 
            case 'announce':
                bot.sendMessage({
                    to: '785949800986181724',
                    message: (message.substring(9))
                });
                console.log('Sent ' + message.substring(9) + 'to #Announcements')
            break;
            //Stops the interval and therein the countdown. 
            case 'stop':
                clearInterval(timer);
                bot.sendMessage({
                    to: channelID,
                    message: ('Stopping...')
                });
                console.log('Stopping...')
            break;
         }
     }
});