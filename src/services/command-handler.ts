import { Command, DEFAULT_COMMANDS } from "../commands/command.js";
import { CommandInteraction } from "discord.js";

export class CommandHandler {
  commands: Command[];
  commandMap: { [commandName: string]: Command };

  constructor() {
    this.commands = this.provideCommands();
    this.commandMap = this.mapCommands(this.commands);
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
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await this.handleInteractionError(interaction);
    }
  }
}
