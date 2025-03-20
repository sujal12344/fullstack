import inquirer from "inquirer";
import { ProjectOptions } from "../types/index.js";

export async function promptUser(): Promise<ProjectOptions> {
  return inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "What is your project name?",
      validate: (input: string) => {
        if (/^([A-Za-z\-_\d])+$/.test(input)) return true;
        return "Project name may only include letters, numbers, underscores and hashes.";
      },
      default: "my-customised-app",
    },
    {
      type: "list",
      name: "language",
      message: "Which language would you like to use?",
      choices: ["TypeScript", "JavaScript"],
      default: "TypeScript",
    },
    {
      type: "confirm",
      name: "useTailwind",
      message: "Would you like to use Tailwind CSS?",
      default: true,
    },
    {
      type: "confirm",
      name: "useClerk",
      message: "Would you like to use Clerk for authentication?",
      default: true,
    },
    {
      type: "list",
      name: "orm",
      message: "Which ORM would you like to use?",
      choices: ["None", "Prisma", "Drizzle"],
      default: "None",
    },
    {
      type: "list",
      name: "database",
      message: "Which database would you like to use?",
      choices: ["None", "PostgreSQL", "SQLite", "MySQL"],
      when: (answers) => answers.orm !== "None",
    },
    {
      type: "confirm",
      name: "initGit",
      message: "Initialize a git repository?",
      default: true,
    },
    {
      type: "confirm",
      name: "installDeps",
      message: "Install dependencies?",
      default: false,
    },
    {
      type: "confirm",
      name: "useSrcDir",
      message: "Would you like to use a src directory?",
      default: false,
    },
    {
      type: "confirm",
      name: "useAppRouter",
      message: "Would you like to use App Router?",
      default: true,
    },
    {
      type: "confirm",
      name: "useTurbopack",
      message: "Would you like to use Turbopack?",
      default: true,
    },
    {
      type: "input",
      name: "importAlias",
      message: "Enter import alias (or leave empty to skip):",
      default: "@",
    },
  ]);
}
