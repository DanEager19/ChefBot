import { BaseCommandInteraction, Client, Message } from "discord.js";
import { Command } from "../command";

export const RoleReact: Command = {
    name: "rolereact",
    description: "Sends a message with all reaction emojis.",
    type: "CHAT_INPUT",
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        const content = "React for role!";

        const message = await interaction.followUp({
            ephemeral: true,
            content
        });
        try {
            await interaction.react()
        }
    }
}