import { SlashCommandBuilder } from "discord.js";
import { Command, CommandUtils } from "../command.js";
import { ServerStatusCheckerService } from "../../services/server-status.js";
import { ServerLauncherService } from "../../services/server-launcher.js";
import baseLogger from "../../providers/logger.js";

const logger = baseLogger.child({ service: "ServerStartCommand" });

export const ServerStartCommand: Command = {
  data: new SlashCommandBuilder()
    .setName("start")
    .setDescription(
      "Starts the Minecraft server if one is not already running.",
    ),
  execute: async (interaction) => {
    const serverStatus = new ServerStatusCheckerService();
    const serverLauncher = new ServerLauncherService();
    const followUp = CommandUtils.followUpOnInteraction(interaction);

    logger.info(`${interaction.user.tag} called /start.`);
    await interaction.deferReply({ ephemeral: true });

    if (await serverStatus.isLive()) {
      await followUp("Server is already live!");
    } else {
      // Todo: const pid = await serverLauncher.launch();
      const pid = -1;
      await followUp(
        `Server has been launched with PID ${pid}, this may take a while. Please check back again using /status.`,
      );
    }
  },
};
