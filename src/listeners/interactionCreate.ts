import { BaseCommandInteraction, Client, Interaction } from "discord.js";
import { Commands } from "../commands";

export function InteractionCreate(client: Client): void {
    try {
        client.on("interactionCreate", async (interaction: Interaction) => {
            if (interaction.isCommand() || interaction.isContextMenu()) {
                await handleSlashCommand(client, interaction);
            }
        });
    } catch (error) {
        console.error(error);
    }
}

const handleSlashCommand = async (client: Client, interaction: BaseCommandInteraction): Promise<void> => {
    const slashCommand = Commands.find(c => c.name === interaction.commandName);
    try {
        await interaction.deferReply();
        slashCommand?.run(client, interaction);
    } catch (error) {
        interaction.followUp({content: "An error has occured."});
    }
}