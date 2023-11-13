import { spawn } from "child_process";
import baseLogger from "../providers/logger.js";
import { Logger } from "winston";

export class ServerLauncherService {
  logger: Logger;

  constructor() {
    this.logger = baseLogger.child("ServerLauncherService");
  }

  async launch(): Promise<number> {
    return await new Promise((resolve, reject) => {
      try {
        this.logger.info("Attempting to launch server.");

        const batchFile = spawn("cmd.exe", [
          "/c",
          "X:\\Game\\Minecraft\\Minecraft Server\\Spigot\\BikerGang\\start.bat",
        ]);

        this.logger.info(`Launched with PID ${batchFile.pid}.`);
        resolve(batchFile.pid ?? -1);
      } catch (e) {
        this.logger.error(e);
        reject(
          new Error(`ServerLauncher: Error launching server with error ${e}`),
        );
      }
    });
  }
}
