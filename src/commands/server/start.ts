import { SlashCommandBuilder } from "discord.js";
import { Command } from "../command.js";
import { ServerStatusCheckerService } from "../../services/server-status.js";
import { ServerLauncherService } from "../../services/server-launcher.js";

export const StartServerCommand: Command = {
  data: new SlashCommandBuilder()
    .setName("start")
    .setDescription(
      "Starts the Minecraft server if one is not already running.",
    ),
  execute: async (interaction) => {
    const serverStatus = new ServerStatusCheckerService();
    const serverLauncher = new ServerLauncherService();

    const followUp = async (message: string) =>
      await interaction.followUp({ content: message, ephemeral: true });

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
