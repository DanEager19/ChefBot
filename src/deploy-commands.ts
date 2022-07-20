import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { clientId, guildId, token } from './auth.json';

import { commandFiles } from "./commands";
const commands = [];

for (const command of commandFiles) {
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('[+] - Successfully registered application commands.'))
	.catch(console.error);