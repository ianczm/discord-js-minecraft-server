import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { ServerStartCommand } from "./server/start.js";
import { ServerStatusCommand } from "./server/status.js";

export type Command = {
  data: SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => Promise<void>;
};

export namespace CommandUtils {
  export const followUpOnInteraction =
    (interaction: CommandInteraction) => async (message: string) =>
      await interaction.followUp({ content: message, ephemeral: true });
}

export const DEFAULT_COMMANDS: Command[] = [
  ServerStartCommand,
  ServerStatusCommand,
];
