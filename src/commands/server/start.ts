import { SlashCommandBuilder } from "discord.js";
import { Command } from "../command.js";

export const StartServerCommand: Command = {
  data: new SlashCommandBuilder()
    .setName("start")
    .setDescription(
      "Starts the Minecraft server if one is not already running.",
    ),
  execute: async (interaction) => {
    await interaction.reply(`Server is running.`);
  },
};
