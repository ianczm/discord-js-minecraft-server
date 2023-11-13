import axios from "axios";
import { MCStatus } from "../dto/mcstatus.js";
import baseLogger from "../providers/logger.js";
import { Logger } from "winston";

export class ServerStatusCheckerService {
  serverAddress: string;
  logger: Logger;

  constructor() {
    if (
      process.env.SERVER_ADDRESS === "" ||
      process.env.SERVER_ADDRESS === undefined
    ) {
      throw new Error("SERVER_ADDRESS is missing.");
    }
    this.serverAddress = process.env.SERVER_ADDRESS;
    this.logger = baseLogger.child({ service: "ServerStatusCheckerService" });
  }

  async getStatus() {
    this.logger.info("Getting status from MCStatus.");
    const response = await axios.get<MCStatus.Response>(
      `https://api.mcstatus.io/v2/status/java/${this.serverAddress}`,
    );

    if (response.status !== 200) {
      this.logger.error(`MCStatus responded with status ${response.status}`);
      throw new Error("Bad response from MCStatus.");
    }

    const data = response.data;
    this.logger.info("Received response from MCStatus.");
    this.logger.http(data);

    return {
      online: data.online,
      players: data.online
        ? data.players.list.map((player) => player.name_raw)
        : [],
    };
  }

  async isLive(): Promise<boolean> {
    try {
      this.logger.info("Checking status of server.");
      const status = await this.getStatus();
      this.logger.info(`Server online status is: ${status.online}.`);
      return status.online;
    } catch (e) {
      return false;
    }
  }
}
