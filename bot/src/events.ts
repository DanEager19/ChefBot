import { InteractionCreate } from "./events/interactionCreate";
import { MessageReactionAdd } from "./events/messageReactionAdd";
import { MessageReactionRemove } from "./events/messageReactionRemove";
import { Ready } from "./events/ready";

export const eventFiles: any = [
    InteractionCreate,
    MessageReactionRemove,
    Ready,
    MessageReactionAdd
];