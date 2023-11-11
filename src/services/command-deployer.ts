import { REST, Routes } from "discord.js";
import { Command, DEFAULT_COMMANDS } from "../commands/command.js";
import { UserCommand } from "../commands/user.js";

export class CommandDeployerService {
  token: string;
  applicationId: string;
  guildId: string;

  discordClient: REST;
  commands: Command[];

  constructor() {
    if (process.env.BOT_TOKEN === "" || process.env.BOT_TOKEN === undefined) {
      throw new Error("BOT_TOKEN is missing.");
    } else {
      this.token = process.env.BOT_TOKEN ?? "";
      this.applicationId = process.env.APPLICATION_ID ?? "";
      this.guildId = process.env.GUILD_ID ?? "";
      this.discordClient = new REST().setToken(this.token);
      this.commands = this.provideCommands();
    }
  }

  // Register commands here
  provideCommands() {
    return DEFAULT_COMMANDS;
  }

  async run() {
    await this.discordClient.put(
      Routes.applicationGuildCommands(this.applicationId, this.guildId),
      {
        body: this.commands.map((command) => command.data.toJSON()),
      },
    );
  }
}
