import { execa } from "execa";
import { execSync } from "child_process";
import { ProjectOptions, GlobalOptions } from "../types/index.js";
import { createSpinner } from "../utils/spinner.js";
import { logger } from "../utils/logger.js";

let globalOptions: GlobalOptions;

export async function createNextProject(
  options: ProjectOptions
): Promise<string> {
  const {
    projectName,
    language,
    useTailwind,
    useClerk,
    orm,
    database,
    initGit,
    installDeps,
    useSrcDir,
    useAppRouter,
    useTurbopack,
    importAlias,
  } = options;

  globalOptions = {
    projectName,
    language,
    useTailwind,
    useClerk,
    orm,
    database,
    initGit,
    installDeps,
    useSrcDir,
    useAppRouter,
    useTurbopack,
    importAlias,
  };

  const spinner = createSpinner("Creating Next.js project...");

  const args = [
    "create-next-app@latest",
    projectName,
    "--use-npm",
    "--eslint",
    language === "TypeScript" ? "--ts" : "--js",
    useTailwind ? "--tailwind" : "--no-tailwind",
    useAppRouter ? "--app" : "--no-app",
    useSrcDir ? "--src-dir" : "--no-src-dir",
    useTurbopack ? "--turbopack" : "--no-turbopack",
    importAlias ? `--import-alias=${importAlias}` : "--no-import-alias",
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
