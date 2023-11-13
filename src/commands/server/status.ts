import { SlashCommandBuilder } from "discord.js";
import { Command, CommandUtils } from "../command.js";
import { ServerStatusCheckerService } from "../../services/server-status.js";
import baseLogger from "../../providers/logger.js";

const logger = baseLogger.child({ service: "ServerStatusCommand" });

function buildStatusMessage(status: { players: string[]; online: boolean }) {
  if (status.online) {
    if (status.players.length > 0) {
      return `Server is live with ${
        status.players.length
      } player(s): ${status.players.join(", ")}.`;
    } else {
      return `Server is live with no players.`;
    }
  } else {
    return "Server is down.";
  }
}

export const ServerStatusCommand: Command = {
  data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Checks if the Minecraft server is running."),
  execute: async (interaction) => {
    const serverStatus = new ServerStatusCheckerService();

    logger.info(`${interaction.user.tag} called /status.`);

    await interaction.deferReply({ ephemeral: true });
    const followUp = CommandUtils.followUpOnInteraction(interaction);

    const status = await serverStatus.getStatus();
    await followUp(buildStatusMessage(status));
  },
};
