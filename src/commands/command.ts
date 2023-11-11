import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { UserCommand } from "./user.js";

export type Command = {
  data: SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => Promise<void>;
};

export const DEFAULT_COMMANDS: Command[] = [UserCommand];
