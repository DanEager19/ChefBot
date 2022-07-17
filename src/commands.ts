import { Command } from "./command";
import { Hello } from "./commands/Hello";
import { Twitter } from "./commands/Twitter";
import { GetItems } from "./commands/GetItems";

export const Commands: Command[] = [Hello, Twitter, GetItems];