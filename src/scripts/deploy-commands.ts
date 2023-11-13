import { CommandDeployerService } from "../services/command-deployer.js";
import dotenv from "dotenv";
import baseLogger from "../providers/logger.js";

dotenv.config();

const logger = baseLogger.child({ service: "CommandDeployerScript" });

const commandDeployer = new CommandDeployerService();
await commandDeployer.run();

logger.info(
  `CommandDeployer: Refreshed ${commandDeployer.commands.length} slash command(s).`,
);
