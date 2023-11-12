import { SlashCommandBuilder } from "discord.js";
import { Command, CommandUtils } from "../command.js";
import { ServerStatusCheckerService } from "../../services/server-status.js";
import { ServerLauncherService } from "../../services/server-launcher.js";

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

    await interaction.deferReply({ ephemeral: true });

    if (await serverStatus.isLive()) {
      await followUp("Server is already live!");
    } else {
      await serverLauncher.launch();
      if (await serverStatus.isLive()) {
        await followUp("Server has just gone live!");
      } else {
        await followUp("There was a problem going live.");
      }
    }
  },
};
