import prompts from "prompts";
import { GlobalOptions } from "../types/index.js";

export async function promptUser(): Promise<GlobalOptions> {
  const response = await prompts([
    {
      type: "text",
      name: "projectName",
      message: "What is your project name?",
      initial: "my-customised-app",
      validate: (input: string) => {
        if (/^([A-Za-z\-_\d])+$/.test(input)) return true;
        return "Project name may only include letters, numbers, underscores and hashes.";
      },
    },
    {
      type: "select",
      name: "language",
      message: "Which language would you like to use?",
      choices: [
        { title: "TypeScript", value: "TypeScript" },
        { title: "JavaScript", value: "JavaScript" },
      ],
      initial: 0,
    },
    {
      type: "toggle",
      name: "useTailwind",
      message: "Would you like to use Tailwind CSS?",
      initial: true,
      active: "Yes",
      inactive: "No",
    },
    {
      type: "toggle",
      name: "useClerk",
      message: "Would you like to use Clerk for authentication?",
      initial: true,
      active: "Yes",
      inactive: "No",
    },
    {
      type: "select",
      name: "database",
      message: "Which database would you like to use?",
      choices: [
        { title: "None", value: "None" },
        { title: "PostgreSQL", value: "PostgreSQL" },
        { title: "SQLite", value: "SQLite" },
        { title: "MySQL", value: "MySQL" },
        { title: "MongoDB", value: "MongoDB" },
      ],
      initial: 0,
    },
    {
      type: (prev: string) => (prev !== "None" ? "select" : null),
      name: "orm",
      message: "Which ORM would you like to use?",
      choices: [
        { title: "None", value: "None" },
        { title: "Prisma", value: "Prisma" },
        { title: "Drizzle", value: "Drizzle" },
        { title: "Mongoose", value: "Mongoose" },
      ],
      initial: 0,
    },
    {
      type: "toggle",
      name: "useSrcDir",
      message: "Would you like to use a src directory?",
      initial: false,
      active: "Yes",
      inactive: "No",
    },
    {
      type: "toggle",
      name: "useAppRouter",
      message: "Would you like to use App Router?",
      initial: true,
      active: "Yes",
      inactive: "No",
    },
    {
      type: "toggle",
      name: "useTurbopack",
      message: "Would you like to use Turbopack?",
      initial: true,
      active: "Yes",
      inactive: "No",
    },
    {
      type: "toggle",
      name: "useTemplates",
      message: "Would you like to use a prebuilt template?",
      initial: false,
      active: "Yes",
      inactive: "No",
    },
    {
      type: (prev) => (prev ? "select" : null),
      name: "templates",
      message: "Select templates to include:",
      choices: [
        { title: "E-commerce Store", value: "ecommerce" },
        { title: "Self Blog Application", value: "blog" },
        { title: "Portfolio", value: "portfolio" },
        { title: "Landing Page", value: "landingPage" },
      ],
      initial: 0,
      hint: "Space to select, Return to submit",
    },
    {
      type: "toggle",
      name: "initGit",
      message: "Initialize a git repository?",
      initial: true,
      active: "Yes",
      inactive: "No",
    },
    {
      type: "toggle",
      name: "installDeps",
      message: "Install dependencies?",
      initial: true,
      active: "Yes",
      inactive: "No",
    },
  ]);

  return response as GlobalOptions;
}
