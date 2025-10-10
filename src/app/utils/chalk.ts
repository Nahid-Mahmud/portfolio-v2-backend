/* eslint-disable no-console */
import chalk from "chalk";
class Logger {
  private formatMessage(message: unknown): string {
    if (typeof message === "string" || typeof message === "number" || typeof message === "boolean") {
      return String(message);
    }
    if (message === null || message === undefined) {
      return String(message);
    }
    if (typeof message === "object") {
      try {
        return JSON.stringify(message, null, 2);
      } catch {
        return String(message);
      }
    }
    return String(message);
  }

  log(...messages: unknown[]) {
    const formattedMessages = messages.map((msg) => this.formatMessage(msg));
    console.log(...formattedMessages);
  }

  success(...messages: unknown[]) {
    const formattedMessages = messages.map((msg) => this.formatMessage(msg));
    console.log(chalk.green(...formattedMessages));
  }

  info(...messages: unknown[]) {
    const formattedMessages = messages.map((msg) => this.formatMessage(msg));
    console.log(chalk.blue(...formattedMessages));
  }

  warning(...messages: unknown[]) {
    const formattedMessages = messages.map((msg) => this.formatMessage(msg));
    console.log(chalk.yellow(...formattedMessages));
  }

  error(...messages: unknown[]) {
    const formattedMessages = messages.map((msg) => this.formatMessage(msg));
    console.log(chalk.red(...formattedMessages));
  }
}

const logger = new Logger();
export default logger;
