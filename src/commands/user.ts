import { SlashCommandBuilder } from "discord.js";
import { Command } from "./command.js";

export const UserCommand: Command = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Provides information about the user."),
  execute: async (interaction) => {
    await interaction.reply(
      `This command was run by ${interaction.user.username}, who joined on ${interaction.user.createdAt}`,
    );
  },
};
