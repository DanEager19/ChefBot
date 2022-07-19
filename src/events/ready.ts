import { Client } from "discord.js";

export = {
	name: 'ready',
	once: true,
	execute(client: Client) {
		console.log(`[~] - Ready! Logged in as ${client.user?.tag}`);
	},
};