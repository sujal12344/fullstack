import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { createSpinner } from "../utils/spinner.js";
import { logger } from "../utils/logger.js";
import { getGlobalOptions } from "./nextjs.js";
import { GlobalOptions } from "../types/index.js";
import { execa } from "execa";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = path.join(__dirname, "..", "..");

export async function setupTemplates(
  projectPath: string,
  template: GlobalOptions["templates"]
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
      globalOptions.useSrcDir ? "src/app" : "app"
    );
    // Copy template contents to project
    await fs.copy(templatePath, appDir);

    //if template is ecommerce then delete root page.tsx
    if (template === "ecommerce") {
      await fs.remove(path.join(appDir, "page.tsx"));
      await execa("npm", ["i", "zustand", "react-hot-toast", "framer-motion"], {
        cwd: projectPath,
      });

      //update next.config.js content
      const nextConfigPath = path.join(projectPath, "next.config.ts");
      let nextConfigCon = await fs.readFile(nextConfigPath, "utf-8");
      nextConfigCon = nextConfigCon.replace(
        "/* config options here */",
        `images: {
    remotePatterns: [
      {
        hostname: "media.istockphoto.com",
      },
      {
        hostname: "images.unsplash.com",
      },
    ],
  },`
      );
      await fs.writeFile(nextConfigPath, nextConfigCon);
    }
    spinner.succeed("Templates setup completed");

    logger.success(`Template '${template}' installed.`);
  } catch (error) {
    spinner.fail("Failed to setup templates");
    logger.error("Error setting up templates", error);
    throw error;
  }
}
