import { Client, ClientOptions } from "discord.js";
import { token } from "./auth.json";
import { Ready } from "./listeners/ready";
import { InteractionCreate } from "./listeners/interactionCreate";

const client = new Client({
    intents: []
});

Ready(client);
InteractionCreate(client);

client.login(token);