import { BaseCommandInteraction, Client } from "discord.js";
import { Command } from "../command";

export const Twitter: Command = {
    name: "twitter",
    description: "Returns the cooking/gardening twitter",
    type: "CHAT_INPUT",
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        const content = "<https://twitter.com/DSUCookGarden>";

        await interaction.followUp({
            ephemeral: true,
            content
        });
    }
}