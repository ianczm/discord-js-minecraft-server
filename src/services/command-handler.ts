import { Command, DEFAULT_COMMANDS } from "../commands/command.js";
import { CommandInteraction } from "discord.js";
import baseLogger from "../providers/logger.js";
import { Logger } from "winston";

export class CommandHandler {
  commands: Command[];
  commandMap: { [commandName: string]: Command };
  logger: Logger;

  constructor() {
    this.commands = this.provideCommands();
    this.commandMap = this.mapCommands(this.commands);
    this.logger = baseLogger.child({ service: "CommandHandler" });
  }

  provideCommands() {
    return DEFAULT_COMMANDS;
  }

  private mapCommands(commands: Command[]): { [commandName: string]: Command } {
    const nameCommandPairs = commands.map((command) => [
      command.data.name,
      command,
    ]);
    return Object.fromEntries(nameCommandPairs);
  }

  private getCommand(commandName: string) {
    const command = this.commandMap[commandName];
    if (command === undefined) {
      throw new Error("Command not found.");
    }
    return command;
  }

  private async handleInteractionError(interaction: CommandInteraction) {
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }

  async handleCommand(interaction: CommandInteraction) {
    const commandName = interaction.commandName;
    const command = this.getCommand(commandName);
    try {
      this.logger.info("Attempting to execute command.");
      await command.execute(interaction);
    } catch (error) {
      this.logger.error(error);
      await this.handleInteractionError(interaction);
    }
  }
}
