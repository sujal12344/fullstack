import { execa } from "execa";
import fs from "fs-extra";
import path from "path";
import inquirer from "inquirer";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { createSpinner } from "../utils/spinner.js";
import { logger } from "../utils/logger.js";
import { getGlobalOptions } from "./nextjs.js";
import prompts from "prompts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Moving up two levels - from src/generators to project root
const rootDir = path.join(__dirname, "..", "..");

export async function setupClerk(projectPath: string): Promise<void> {
  const globalOptions = getGlobalOptions();

  try {
    if (globalOptions.language === "TypeScript") {
      // First installation
      const spinner = createSpinner("Installing Clerk...");
      await execa("npm", ["install", "@clerk/nextjs"], {
        cwd: projectPath,
        shell: true,
      });
      spinner.succeed("Clerk installed successfully");

      // Middleware setup
      const middlewareSpinner = createSpinner("Setting up Clerk middleware...");
      const middlewareTemplatePath = path.join(
        rootDir,
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
      middlewareSpinner.succeed("Clerk middleware created");

      // Auth folder setup
      const authSpinner = createSpinner("Setting up auth folder...");
      const authFolderSourcePath = path.join(
        rootDir,
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
      authSpinner.succeed("Auth folder created");

      // Environment setup
      const envSpinner = createSpinner("Setting up environment variables...");
      const envTemplatePath = path.join(
        rootDir,
        "clerkTemplates",
        ".env.template.env"
      );
      const envPath = path.join(projectPath, ".env");

      const envContent = await fs.readFile(envTemplatePath, "utf-8");
      await fs.writeFile(envPath, envContent);
      envSpinner.succeed(".env file created for Clerk");

      // Ask about Clerk themes
      const { useclerkThemes } = await prompts([
        {
          type: "toggle",
          name: "useclerkThemes",
          message: "Would you like to use Clerk themes?",
          initial: true,
          active: "Yes",
          inactive: "No",
        },
      ]);

      if (useclerkThemes) {
        const themesSpinner = createSpinner("Installing Clerk themes...");
        await execa("npm", ["install", "@clerk/themes"], { cwd: projectPath });
        themesSpinner.succeed("Clerk themes installed");

        const layoutSpinner = createSpinner("Setting up Clerk themes...");
        const layoutClerkThemesTemplatePath = path.join(
          rootDir,
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
        layoutSpinner.succeed("Layout file configured for Clerk themes");
      }

      logger.success("Clerk setup completed successfully");
    } else {
      logger.warn("Clerk is only supported with TypeScript projects");
    }
  } catch (error) {
    logger.error("Failed to setup Clerk", error);
    throw error;
  }
}
