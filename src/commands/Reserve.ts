import { BaseCommandInteraction, Client } from "discord.js";
import { Command } from "../command";

export const Reserve: Command = {
    name: "reserve",
    description: "Returns the cooking/gardening twitter",
    type: "CHAT_INPUT",
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        const content = "";

        await interaction.followUp({
            ephemeral: true,
            content
        });
    }
}