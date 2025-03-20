#!/usr/bin/env node

import inquirer from "inquirer";
import { execa } from "execa";
import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import ora from "ora";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const spinner = ora();

let globalOptions;

async function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "What is your project name?",
      validate: (input) => {
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
      default: false,
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
      message: "Would you like to use a App Router?",
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

async function createNextProject(options) {
  const {
    projectName,
    language,
    useTailwind,
    useSrcDir,
    useAppRouter,
    useTurbopack,
    importAlias,
  } = options;

  globalOptions = {
    projectName,
    language,
    useTailwind,
    useSrcDir,
    useAppRouter,
    useTurbopack,
    importAlias,
  };

  spinner.start("Creating Next.js project...");

  const args = [
    "create-next-app@latest",
    projectName,
    "--use-npm",
    "--eslint",
    language === "TypeScript" ? "--typescript" : "--js",
    useTailwind ? "--tailwind" : "--no-tailwind",
    useAppRouter ? "--app" : "--no-app",
    useSrcDir ? "--src-dir" : "--no-src-dir",
    useTurbopack ? "--turbopack" : "--no-turbopack",
    importAlias ? `--import-alias=${importAlias}` : "--no-import-alias",
  ];

  try {
    console.log("Running command:", `npx ${args.join(" ")}`);
    execSync(`npx ${args.join(" ")}`, { stdio: "inherit", shell: true });
    spinner.succeed("Next.js project created successfully");
  } catch (error) {
    spinner.fail("Failed to create Next.js project");
    console.error(error);
  }
}

async function setupClerk(projectPath) {
  try {
    if (globalOptions.language === "TypeScript") {
      // First installation
      spinner.start("Installing Clerk...");
      await execa("npm", ["install", "@clerk/nextjs"], {
        cwd: projectPath,
        shell: true,
      });
      spinner.succeed("Clerk installed successfully");

      // Middleware setup
      spinner.start("Setting up Clerk middleware...");
      const middlewareTemplatePath = path.join(
        __dirname,
        "clerkTemplates",
        "middleware.template.ts"
      );
      const middlewarePath = path.join(
        projectPath,
        globalOptions.useSrcDir ? "src/middleware.ts" : "middleware.ts"
      );

      const middlewareContent = await fs.readFile(
        middlewareTemplatePath,
        "utf-8"
      );
      await fs.writeFile(middlewarePath, middlewareContent);
      spinner.succeed("Clerk middleware created");

      // Auth folder setup
      spinner.start("Setting up auth folder...");
      const authFolderSourcePath = path.join(
        __dirname,
        "clerkTemplates",
        "(auth)"
      );
      const authFolderDestPath = path.join(
        projectPath,
        globalOptions.useSrcDir
          ? globalOptions.useAppRouter
            ? "src/app/(auth)"
            : "src/pages/(auth)"
          : globalOptions.useAppRouter
          ? "app/(auth)"
          : "pages/(auth)"
      );

      await fs.copy(authFolderSourcePath, authFolderDestPath);
      spinner.succeed("Auth folder created");

      // Environment setup
      spinner.start("Setting up environment variables...");
      const envTemplatePath = path.join(
        __dirname,
        "clerkTemplates",
        ".env.template.env"
      );
      const envPath = path.join(projectPath, ".env");

      const envContent = await fs.readFile(envTemplatePath, "utf-8");
      await fs.writeFile(envPath, envContent);
      spinner.succeed(".env file created for Clerk");

      // IMPORTANT: Stop spinner completely before showing prompt
      spinner.stop();

      const { useclerkThemes } = await inquirer.prompt([
        {
          type: "confirm",
          name: "useclerkThemes",
          message: "Would you like to use Clerk themes?",
          default: false,
        },
      ]);

      if (useclerkThemes) {
        spinner.start("Installing Clerk themes...");
        await execa("npm", ["install", "@clerk/themes"], { cwd: projectPath });

        spinner.start("Setting up Clerk themes...");
        const layoutClerkThemesTemplatePath = path.join(
          __dirname,
          "clerkTemplates",
          "layout.clerkThemes.tsx"
        );
        const layoutClerkThemesPath = path.join(
          projectPath,
          globalOptions.useSrcDir ? "src/app/layout.tsx" : "app/layout.tsx"
        );

        const layoutClerkThemesContent = await fs.readFile(
          layoutClerkThemesTemplatePath,
          "utf-8"
        );
        await fs.writeFile(layoutClerkThemesPath, layoutClerkThemesContent);
        spinner.succeed("Layout file configured for Clerk themes");
      }

      console.log(chalk.green("✅ Clerk setup completed successfully"));
    } else {
      console.log(
        chalk.red("Clerk is only supported with TypeScript projects")
      );
    }
  } catch (error) {
    spinner.fail("Failed to setup Clerk");
    console.error(chalk.red("Error:"), error);
    throw error;
  }
}

async function setupORM(projectPath, orm, database) {
  if (orm === "None") return;

  spinner.start(`Setting up ${orm}...`);

  try {
    if (orm === "Prisma") {
      await execa("npm", ["install", "prisma", "--save-dev"], {
        cwd: projectPath,
      });
      await execa("npm", ["install", "@prisma/client"], { cwd: projectPath });
      await execa("npx", ["prisma", "init"], { cwd: projectPath });

      // Update schema.prisma with selected database
      const dbUrl =
        database === "PostgreSQL"
          ? "postgresql://"
          : database === "MySQL"
          ? "mysql://"
          : "file:./dev.db";

      const schemaContent = `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "${database.toLowerCase()}"
  url      = "${dbUrl}"
}`;

      await fs.writeFile(
        path.join(projectPath, "prisma/schema.prisma"),
        schemaContent
      );
    } else if (orm === "Drizzle") {
      await execa("npm", ["install", "drizzle-orm"], { cwd: projectPath });
      await execa("npm", ["install", "drizzle-kit", "--save-dev"], {
        cwd: projectPath,
      });

      // Install database-specific dependencies
      if (database === "PostgreSQL") {
        await execa("npm", ["install", "pg", "@types/pg"], {
          cwd: projectPath,
        });
      } else if (database === "MySQL") {
        await execa("npm", ["install", "mysql2"], { cwd: projectPath });
      } else if (database === "SQLite") {
        await execa("npm", ["install", "better-sqlite3"], { cwd: projectPath });
      }
    }

    spinner.succeed(`${orm} setup completed`);
  } catch (error) {
    spinner.fail(`Failed to setup ${orm}`);
    throw error;
  }
}

async function initializeGit(projectPath) {
  spinner.start("Initializing git repository...");

  try {
    await execa("git", ["init"], { cwd: projectPath });
    spinner.succeed("Git repository initialized");
  } catch (error) {
    spinner.fail("Failed to initialize git repository");
    throw error;
  }
}

async function main() {
  console.log(
    chalk.blue.bold.bgMagentaBright(
      "Welcome to the Next.js Project Generator!\n"
    )
  );

  try {
    const options = await promptUser();

    const projectPath = path.join(process.cwd(), options.projectName);

    await createNextProject(options);
    console.log({ options });

    if (options.useClerk) {
      await setupClerk(projectPath);
    }

    if (options.orm !== "None") {
      await setupORM(projectPath, options.orm, options.database);
    }

    if (options.initGit) {
      await initializeGit(projectPath);
    }

    if (options.installDeps) {
      spinner.start("Installing dependencies...");
      await execa("npm", ["install"], { cwd: projectPath });
      spinner.succeed("Dependencies installed");
    }

    console.log(chalk.green.bold("\n✨ Project setup completed successfully!"));
    console.log(chalk.cyan("\nNext steps:"));
    console.log(chalk.white(`  cd ${options.projectName}`));
    console.log(chalk.white("  npm run dev"));
  } catch (error) {
    console.error(chalk.red("An error occurred:"), error);
    process.exit(1);
  }
}

main().catch(console.error);
