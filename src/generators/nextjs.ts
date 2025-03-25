import { execa } from "execa";
import { execSync } from "child_process";
import { GlobalOptions } from "../types/index.js";
import { createSpinner } from "../utils/spinner.js";
import { logger } from "../utils/logger.js";

let globalOptions: GlobalOptions;

export async function createNextProject(
  options: GlobalOptions
): Promise<string> {
  const {
    projectName,
    language,
    useClerk,
    orm,
    database,
    initGit,
    installDeps,
    useSrcDir,
    useTemplates,
    templates,
  } = options;

  globalOptions = {
    projectName,
    language,
    useClerk,
    orm,
    database,
    initGit,
    installDeps,
    useSrcDir,
    useTemplates,
    templates,
  };

  const spinner = createSpinner("Creating Next.js project...");

  const args = [
    "create-next-app@latest",
    projectName,
    "--use-npm",
    "--eslint",
    language === "TypeScript" ? "--ts" : "--js",
    "--tailwind",
    "--app",
    useSrcDir ? "--src-dir" : "--no-src-dir",
    "--turbopack",
    "--import-alias=@",
    "--skip-questions",
  ];

  try {
    // logger.info("\nRunning command: " + `npx ${args.join(" ")}`);
    execSync(`npx ${args.join(" ")}`, { stdio: "inherit" });
    spinner.succeed("Next.js project created successfully");
    return projectName;
  } catch (error) {
    spinner.fail("Failed to create Next.js project");
    logger.error("Error creating Next.js project", error);
    throw error;
  }
}

export function getGlobalOptions(): GlobalOptions {
  return globalOptions;
}
