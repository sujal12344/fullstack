import chalk from "chalk";

export const logger = {
  info: (message: string) => console.log(chalk.blue(message)),
  success: (message: string) => console.log(chalk.green(`✓ ${message}`)),
  error: (message: string, error?: any) => {
    console.error(chalk.red(`✗ ${message}`));
    if (error) console.error(chalk.red(error));
  },
  warn: (message: string) => console.log(chalk.yellow(`! ${message}`)),
  title: (message: string) =>
    console.log(chalk.blue.bold.bgMagentaBright(message)),
  nextSteps: (projectName: string) => {
    console.log(chalk.green.bold("\n✨ Project setup completed successfully!"));
    console.log(chalk.cyan("\nNext steps:"));
    console.log(chalk.white(`  cd ${projectName}`));
    console.log(chalk.white("  npm install"));
    console.log(chalk.white("  npm run dev"));
  },
};
