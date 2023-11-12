import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { StartServerCommand } from "./server/start.js";

export type Command = {
  data: SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => Promise<void>;
};

export const DEFAULT_COMMANDS: Command[] = [StartServerCommand];
