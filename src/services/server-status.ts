import ping from "ping";

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

  async isLive(): Promise<boolean> {
    const res = await ping.promise.probe(this.serverAddress);
    console.log(res);
    console.log(this.serverAddress);
    return res.alive;
  }
}
