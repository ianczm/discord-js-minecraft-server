// Require the necessary discord.js classes
import { Client, Events, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import { CommandHandler } from "./services/command-handler.js";
import baseLogger from "./providers/logger.js";

dotenv.config();

const token = process.env.BOT_TOKEN ?? "";
const logger = baseLogger.child({ service: "IndexEntrypoint" });

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const commandHandler = new CommandHandler();

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c) => {
  logger.info(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isChatInputCommand()) {
    await commandHandler.handleCommand(interaction);
  }
});

// Log in to Discord with your client's token
await client.login(token);
