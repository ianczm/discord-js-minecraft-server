import axios from "axios";
import { MCStatus } from "../dto/mcstatus.js";

export class ServerStatusCheckerService {
  serverAddress: string;

  constructor() {
    if (
      process.env.SERVER_ADDRESS === "" ||
      process.env.SERVER_ADDRESS === undefined
    ) {
      throw new Error("SERVER_ADDRESS is missing.");
    }
    this.serverAddress = process.env.SERVER_ADDRESS;
  }

  async getStatus() {
    const response = await axios.get<MCStatus.Response>(
      `https://api.mcstatus.io/v2/status/java/${this.serverAddress}`,
    );

    if (response.status !== 200) {
      throw new Error("Bad response from MCStatus.");
    }

    const data = response.data;

    return {
      online: data.online,
      players: data.online
        ? data.players.list.map((player) => player.name_raw)
        : [],
    };
  }

  async isLive(): Promise<boolean> {
    try {
      const status = await this.getStatus();
      return status.online;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
