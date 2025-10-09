/* eslint-disable no-console */
import chalk from "chalk";
class Logger {
  log(...messages: unknown[]) {
    console.log(...messages);
  }

  success(...messages: unknown[]) {
    console.log(chalk.green(...messages));
  }

  info(...messages: unknown[]) {
    console.log(chalk.blue(...messages));
  }

  warning(...messages: unknown[]) {
    console.log(chalk.yellow(...messages));
  }

  error(...messages: unknown[]) {
    console.log(chalk.red(...messages));
  }
}

const logger = new Logger();
export default logger;
