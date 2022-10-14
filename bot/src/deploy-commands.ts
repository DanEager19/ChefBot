import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { commandFiles } from "./commands";
import dotenv from 'dotenv';
dotenv.config()

const commands = [];

for (const command of commandFiles) {
	console.log(`[+] - Pushed command ${command.data.name}.`)
	commands.push(command.data.toJSON());
}

let rest: any;

typeof(process.env.TOKEN) === 'string' ? rest = new REST({ version: '9' }).setToken(process.env.TOKEN) : console.log('[x] - Token not set!');

if(typeof(process.env.CLIENT_ID) === 'string' && typeof(process.env.GUILD_ID) === 'string') {
	rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands })
		.then(() => console.log('[+] - Successfully registered application commands.'))
		.catch((e: Error) => console.log(`[x] - ${e}`));
} else if (typeof(process.env.CLIENT_ID) !== 'string') {
	console.log('[x] - Client ID not set!');
} else if (typeof(process.env.GUILD_ID) !== 'string') {
	console.log('[x] - Guild ID not set!');
}