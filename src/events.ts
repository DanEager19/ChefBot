import { InteractionCreate } from "./events/interactionCreate";
import { MessageReactionRemove } from "./events/messageReactionRemove";
import { Ready } from "./events/ready";

export const eventFiles: any = [
    InteractionCreate,
    MessageReactionRemove,
    Ready
];