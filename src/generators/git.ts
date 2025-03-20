import { execa } from "execa";
import { createSpinner } from "../utils/spinner.js";
import { logger } from "../utils/logger.js";

/**
 * Initializes a git repository in the specified project path
 * @param {string} projectPath The path to initialize the git repository in
 */
export async function initializeGit(projectPath: string): Promise<void> {
  const spinner = createSpinner("Initializing Git repository...");

  try {
    // Initialize git repository
    await execa("git", ["init"], { cwd: projectPath });

    // Create .gitignore file if it doesn't exist
    const gitignoreProcess = await execa("npx", ["gitignore", "node"], {
      cwd: projectPath,
      reject: false, // Don't throw if command fails
    });

    // If gitignore command failed, create a basic one
    if (gitignoreProcess.failed) {
      const fs = await import("fs-extra");
      const path = await import("path");

      const basicGitignore = `# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build
/dist

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# vercel
.vercel`;

      await fs.writeFile(path.join(projectPath, ".gitignore"), basicGitignore);
    }

    // Make initial commit
    await execa("git", ["add", "."], { cwd: projectPath });
    await execa(
      "git",
      ["commit", "-m", "Initial commit from create-full-stack"],
      {
        cwd: projectPath,
        reject: false, // Don't throw if commit fails (e.g. no git user configured)
      }
    );

    spinner.succeed("Git repository initialized successfully");
    logger.success("Git setup completed");
  } catch (error) {
    spinner.fail("Failed to initialize Git repository");
    logger.error("Git initialization error", error);
    throw error;
  }
}
