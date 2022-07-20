import { Client,  Collection, Intents } from "discord.js";
import { token } from "./auth.json";
import { commandFiles } from "./commands";
import { eventFiles } from './events';

const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });
const commands = new Collection();

for (const command of commandFiles) {
	commands.set(command.data.name, command);
}

for (const event of eventFiles) {
	if (event.once) {
		client.once(event.name, (...args: any) => event.execute(...args));
	} else {
		client.on(event.name, (...args: any) => event.execute(...args));
	}
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

client.login(token);