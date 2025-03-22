import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { createSpinner } from "../utils/spinner.js";
import { logger } from "../utils/logger.js";
import { getGlobalOptions } from "./nextjs.js";
import { ProjectOptions } from "../types/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = path.join(__dirname, "..", "..");

export async function setupTemplates(
  projectPath: string,
  template: ProjectOptions["templates"]
): Promise<void> {
  const globalOptions = getGlobalOptions();
  const spinner = createSpinner("Setting up templates...");

  try {
    const templatePath = path.join(rootDir, "templates", template!);

    if (!(await fs.pathExists(templatePath))) {
      return logger.warn(`Template '${template}' not found.`);
    }

    // Determine app directory based on project settings
    const appDir = path.join(
      projectPath,
      globalOptions.useSrcDir
        ? globalOptions.useAppRouter
          ? "src/app"
          : "src/pages"
        : globalOptions.useAppRouter
        ? "app"
        : "pages"
    );
    // Copy template contents to project
    await fs.copy(templatePath, appDir);
    spinner.succeed("Templates setup completed");

    logger.success(`Template '${template}' installed.`);
  } catch (error) {
    spinner.fail("Failed to setup templates");
    logger.error("Error setting up templates", error);
    throw error;
  }
}
