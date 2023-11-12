import { SlashCommandBuilder } from "discord.js";
import { Command, CommandUtils } from "../command.js";
import { ServerStatusCheckerService } from "../../services/server-status.js";
import followUpOnInteraction = CommandUtils.followUpOnInteraction;

export const ServerStatusCommand: Command = {
  data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Checks if the Minecraft server is running."),
  execute: async (interaction) => {
    const serverStatus = new ServerStatusCheckerService();

    await interaction.deferReply({ ephemeral: true });
    const followUp = followUpOnInteraction(interaction);

    (await serverStatus.isLive())
      ? await followUp("Server is live.")
      : await followUp("Server is down.");
  },
};
