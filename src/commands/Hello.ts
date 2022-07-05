import { BaseCommandInteraction, Client } from "discord.js";
import { Command } from "../command";

export const Hello: Command = {
    name: "hello",
    description: "Returns hello",
    type: "CHAT_INPUT",
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        const content = "Hello";

        await interaction.followUp({
            ephemeral: true,
            content
        });
    }
}