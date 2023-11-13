import winston from "winston";
import "winston-daily-rotate-file";

const onlyLevel = (level: string) =>
  winston.format((info, opts) => {
    if (info.level !== level) {
      return false;
    } else {
      return info;
    }
  })();

const customLogFormat = winston.format.printf((info) => {
  function formatMessage(message: any) {
    if (message.constructor === Object) {
      return JSON.stringify(info.message, null, 2);
    } else {
      return message as string;
    }
  }

  function formatLevel(level: string) {
    return `[${level}]`; // Todo: .padEnd(10).substring(0, 10);
  }

  function formatService(service: string) {
    return service.padEnd(30).substring(0, 30);
  }

  return `${info.timestamp} - ${formatService(info.service)} ${formatLevel(
    info.level,
  )}: ${formatMessage(info.message)}`;
});

const baseLogger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        customLogFormat,
      ),
    }),
    new winston.transports.DailyRotateFile({
      filename: "logs/app-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "5d",
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
    new winston.transports.DailyRotateFile({
      filename: "logs/http-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "5d",
      level: "http",
      format: winston.format.combine(
        onlyLevel("http"),
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
  ],
});

export default baseLogger;
