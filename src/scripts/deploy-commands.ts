import { CommandDeployerService } from "../services/command-deployer.js";
import dotenv from "dotenv";

dotenv.config();

const commandDeployer = new CommandDeployerService();
await commandDeployer.run();

console.log(
  `CommandDeployer: Refreshed ${commandDeployer.commands.length} slash command(s).`,
);
