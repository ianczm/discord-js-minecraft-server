import { SlashCommandBuilder } from "discord.js";
import { Command } from "./command.js";
import baseLogger from "../providers/logger.js";

const logger = baseLogger.child({ service: "UserCommand" });

export const UserCommand: Command = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Provides information about the user."),
  execute: async (interaction) => {
    logger.info(`${interaction.user.tag} called /user.`);
    await interaction.reply(
      `This command was run by ${interaction.user.tag}, who joined on ${interaction.user.createdAt}`,
    );
  },
};
