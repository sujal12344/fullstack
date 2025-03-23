#!/usr/bin/env node

import path from "path";
import { promptUser } from "./prompts/index.js";
import { createNextProject } from "./generators/nextjs.js";
import { setupClerk } from "./generators/clerk.js";
import { setupORM } from "./generators/orm.js";
import { initializeGit } from "./generators/git.js";
import { logger } from "./utils/logger.js";
import { createSpinner } from "./utils/spinner.js";
import { execa } from "execa";
import { GlobalOptions } from "./types/index.js";
import { setupTemplates } from "./generators/templates.js";

async function main() {
  logger.title("Welcome to the Next.js Project Generator!\n");

  try {
    // Get user options
    const options: GlobalOptions = await promptUser();
    const projectPath = path.join(process.cwd(), options.projectName);

    // Create Next.js project
    await createNextProject(options);

    // Setup Clerk if selected
    if (options.useClerk) {
      await setupClerk(projectPath);
    }

    // Setup ORM if selected
    if (options.orm !== "None") {
      await setupORM(projectPath, options.orm, options.database);
    }

    // Would you like use any prebuilt templates?
    if (options.useTemplates) {
      await setupTemplates(projectPath, options.templates);
    }

    // Initialize git if selected
    if (options.initGit) {
      await initializeGit(projectPath);
    }

    // Install dependencies if selected
    if (options.installDeps) {
      const spinner = createSpinner("Installing dependencies...");
      await execa("npm", ["install"], { cwd: projectPath });
      spinner.succeed("Dependencies installed");
    }

    // Show next steps
    logger.nextSteps(options.projectName);
  } catch (error) {
    logger.error("An error occurred:", error);
    process.exit(1);
  }
}

main().catch(console.error);
