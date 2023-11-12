import dotenv from "dotenv";

dotenv.config();

export type Config = {
  APPLICATION_ID: string;
  PUBLIC_KEY: string;
  CLIENT_SECRET: string;
  BOT_TOKEN: string;
  GUILD_ID: string;
  SERVER_ADDRESS: string;
  SERVER_START_PATH: string;
};

export class ConfigProvider {
  static configProvider: ConfigProvider | null = null;
  public config: Config;

  static get() {
    if (!this.configProvider) {
      this.configProvider = new ConfigProvider();
    }
    return this.configProvider;
  }

  constructor() {
    this.config = {
      APPLICATION_ID: this.getEnv("APPLICATION_ID"),
      PUBLIC_KEY: this.getEnv("PUBLIC_KEY"),
      CLIENT_SECRET: this.getEnv("CLIENT_SECRET"),
      BOT_TOKEN: this.getEnv("BOT_TOKEN"),
      GUILD_ID: this.getEnv("GUILD_ID"),
      SERVER_ADDRESS: this.getEnv("SERVER_ADDRESS"),
      SERVER_START_PATH: this.getEnv("SERVER_START_PATH"),
    };
  }

  private getEnv(property: string) {
    return process.env[property] ?? "";
  }
}
