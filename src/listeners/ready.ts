import { Client } from "discord.js";
import { Commands } from "../commands";

export function Ready(client: Client): void {
    try {
        client.on("ready", async () => {
            await client.application?.commands.set(Commands);
            console.log(`Logged in as ${client.user?.username}`);
        });
    } catch (error) {
        console.error(error);
    }
}