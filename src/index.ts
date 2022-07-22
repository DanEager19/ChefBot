import { Client,  Collection, Intents } from "discord.js";
import { commandFiles } from "./commands";
import { eventFiles } from './events';
import dotenv from 'dotenv';
dotenv.config()

const client = new Client({ 
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MEMBERS, 
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS
	] 
});
const commands = new Collection();

for (const command of commandFiles) {
	commands.set(command.data.name, command);
	console.log(`[+] - Set command ${command.data.name}.`)
}

for (const event of eventFiles) {
	if (event.once) {
		client.once(event.name, (...args: any) => event.execute(...args));
	} else {
		client.on(event.name, (...args: any) => event.execute(...args));
	}
	console.log(`[+] - Set event ${event.name}.`)
}

client.on('interactionCreate', async (interaction: any) => {
	if (!interaction.isCommand()) return;

	const command: any = commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (e) {
		console.log(`[x] - ${e}`);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

typeof(process.env.TOKEN) === 'string' ? client.login(process.env.TOKEN) : console.log('[x] - Token not set!');