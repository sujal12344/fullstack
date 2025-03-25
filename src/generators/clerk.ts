import { execa } from "execa";
import fs from "fs-extra";
import path from "path";
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
        "clerk",
        "middleware.ts"
      );
      const middlewarePath = path.join(
        projectPath,
        globalOptions.useSrcDir ? "src/middleware.ts" : "middleware.ts"
      );

      await fs.copyFile(middlewareTemplatePath, middlewarePath);
      middlewareSpinner.succeed("Clerk middleware created");

      // Auth folder setup
      const authSpinner = createSpinner("Setting up auth folder...");
      const authFolderSourcePath = path.join(rootDir, "clerk", "(auth)");
      const authFolderDestPath = path.join(
        projectPath,
        globalOptions.useSrcDir
          ? "src/app/(auth)"
          : "app/(auth)"
      );

      await fs.copy(authFolderSourcePath, authFolderDestPath);
      authSpinner.succeed("Auth folder created");

      // Environment setup
      const envSpinner = createSpinner("Setting up environment variables...");
      const envTemplatePath = path.join(rootDir, "clerk", ".env");
      const envPath = path.join(projectPath, ".env");

      await fs.copyFile(envTemplatePath, envPath);
      envSpinner.succeed(".env file created for Clerk");

      // ClerkProviderLayout setup
      const clerkProviderLayoutSpinner = createSpinner(
        "Setting up ClerkProviderLayout page..."
      );
      const clerkProviderLayoutTemplatePath = path.join(
        rootDir,
        "clerk",
        "ClerkProviderLayout.tsx"
      );
      const clerkProviderLayoutPath = path.join(
        projectPath,
        globalOptions.useSrcDir ? "src/app" : "app",
        "ClerkProviderLayout.tsx"
      );

      await fs.copyFile(
        clerkProviderLayoutTemplatePath,
        clerkProviderLayoutPath
      );
      clerkProviderLayoutSpinner.succeed(
        "ClerkProviderLayout file created for Clerk"
      );

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
          "clerk",
          "layout.clerkThemes.tsx"
        );
        const layoutClerkThemesPath = path.join(
          projectPath,
          globalOptions.useSrcDir ? "src/app" : "app",
          "layout.tsx"
        );

        await fs.copyFile(layoutClerkThemesTemplatePath, layoutClerkThemesPath);

        //delete ClerkProviderLayout file and create ClerkProviderThemeLayout file
        await fs.remove(clerkProviderLayoutPath);
        const clerkProviderThemeLayoutTemplatePath = path.join(
          rootDir,
          "clerk",
          "ClerkProviderThemeLayout.tsx"
        );
        const clerkProviderThemeLayoutPath = path.join(
          projectPath,
          globalOptions.useSrcDir ? "src/app" : "app",
          "ClerkProviderThemeLayout.tsx"
        );

        await fs.copyFile(
          clerkProviderThemeLayoutTemplatePath,
          clerkProviderThemeLayoutPath
        );

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
