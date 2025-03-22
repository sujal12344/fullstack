import { execa } from "execa";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { createSpinner } from "../utils/spinner.js";
import { logger } from "../utils/logger.js";
import { getGlobalOptions } from "./nextjs.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = path.join(__dirname, "..", "..");

export async function setupORM(
  projectPath: string,
  orm: "Prisma" | "Drizzle",
  database?: "PostgreSQL" | "SQLite" | "MySQL" | "None"
): Promise<void> {
  try {
    if (orm === "Prisma") {
      await setupPrisma(projectPath, database);
    } else if (orm === "Drizzle") {
      await setupDrizzle(projectPath, database);
    }
  } catch (error) {
    logger.error("Failed to setup ORM", error);
    throw error;
  }
}

async function setupPrisma(
  projectPath: string,
  database?: "PostgreSQL" | "SQLite" | "MySQL" | "None"
): Promise<void> {
  const spinner = createSpinner("Installing Prisma...");
  const globalOptions = getGlobalOptions();

  try {
    // Install Prisma dependencies
    await execa("npm", ["install", "prisma", "--save-dev"], {
      cwd: projectPath,
    });
    await execa("npm", ["install", "@prisma/client"], { cwd: projectPath });
    spinner.succeed("Prisma installed successfully");

    // Initialize Prisma
    const initSpinner = createSpinner("Initializing Prisma...");
    await execa("npx", ["prisma", "init", "--datasource-provider", database!], {
      cwd: projectPath,
    });
    initSpinner.succeed("Prisma initialized");

    // Configure database in schema.prisma
    //     if (database && database !== "None") {
    //       const schemaSpinner = createSpinner(
    //         `Configuring Prisma for ${database}...`
    //       );
    //       const schemaPath = path.join(projectPath, "prisma", "schema.prisma");

    //       let schemaContent = await fs.readFile(schemaPath, "utf-8");

    //       // Replace the default database provider with the selected one
    //       switch (database) {
    //         case "PostgreSQL":
    //           schemaContent = schemaContent.replace(
    //             'provider = "postgresql"',
    //             'provider = "postgresql"'
    //           );
    //           break;
    //         case "SQLite":
    //           schemaContent = schemaContent.replace(
    //             'provider = "postgresql"',
    //             'provider = "sqlite"'
    //           );
    //           schemaContent = schemaContent.replace(
    //             'url      = env("DATABASE_URL")',
    //             'url      = "file:./dev.db"'
    //           );
    //           break;
    //         case "MySQL":
    //           schemaContent = schemaContent.replace(
    //             'provider = "postgresql"',
    //             'provider = "mysql"'
    //           );
    //           break;
    //       }

    //       // Update the schema file
    //       await fs.writeFile(schemaPath, schemaContent);
    //       schemaSpinner.succeed(`Prisma configured for ${database}`);

    //       // Add example model
    //       const modelSpinner = createSpinner("Adding example model...");
    //       const exampleModel = `\nmodel Example {
    //   id        String   @id @default(cuid())
    //   createdAt DateTime @default(now())
    //   updatedAt DateTime @updatedAt
    // }\n`;

    //       await fs.appendFile(schemaPath, exampleModel);
    //       modelSpinner.succeed("Example model added to schema");
    //     }

    // Update .env file with proper database URL if not SQLite
    // if (database && database !== "SQLite" && database !== "None") {
    //   const envPath = path.join(projectPath, ".env");
    //   let envContent = "";

    //   if (await fs.pathExists(envPath)) {
    //     envContent = await fs.readFile(envPath, "utf-8");
    //   }

    //   if (!envContent.includes("DATABASE_URL")) {
    //     const dbUrlSpinner = createSpinner("Setting up database URL...");
    //     let databaseUrl = "";

    //     switch (database) {
    //       case "PostgreSQL":
    //         databaseUrl =
    //           'DATABASE_URL="postgresql://postgres:password@localhost:5432/mydb?schema=public"';
    //         break;
    //       case "MySQL":
    //         databaseUrl =
    //           'DATABASE_URL="mysql://root:password@localhost:3306/mydb"';
    //         break;
    //     }

    //     await fs.appendFile(envPath, `\n${databaseUrl}\n`);
    //     dbUrlSpinner.succeed("Database URL added to .env file");
    //   }
    // }

    // Init prismadb in lib
    const prismadbSpinner = createSpinner("Initializing prismadb in lib...");

    const libFolderSourcePath = path.join(rootDir, "clerkTemplates", "lib");
    const libFolderDestPath = path.join(
      projectPath,
      globalOptions.useSrcDir
        ? globalOptions.useAppRouter
          ? "src/lib"
          : "src/lib"
        : globalOptions.useAppRouter
        ? "lib"
        : "lib"
    );

    await fs.copy(libFolderSourcePath, libFolderDestPath);
    prismadbSpinner.succeed("Prisma client initialized");

    logger.success("Prisma setup completed successfully");
  } catch (error) {
    spinner.fail("Failed to setup Prisma");
    throw error;
  }
}

async function setupDrizzle(
  projectPath: string,
  database?: "PostgreSQL" | "SQLite" | "MySQL" | "None"
): Promise<void> {
  const spinner = createSpinner("Installing Drizzle...");

  try {
    // Install Drizzle core
    await execa("npm", ["install", "drizzle-orm"], { cwd: projectPath });

    // Install Drizzle kit
    await execa("npm", ["install", "drizzle-kit", "--save-dev"], {
      cwd: projectPath,
    });

    // Install database driver based on selection
    if (database) {
      switch (database) {
        case "PostgreSQL":
          await execa("npm", ["install", "pg", "@types/pg"], {
            cwd: projectPath,
          });
          break;
        case "SQLite":
          await execa(
            "npm",
            ["install", "better-sqlite3", "@types/better-sqlite3"],
            { cwd: projectPath }
          );
          break;
        case "MySQL":
          await execa("npm", ["install", "mysql2"], { cwd: projectPath });
          break;
      }
    }

    spinner.succeed("Drizzle and database drivers installed");

    // Create drizzle directory structure
    const configSpinner = createSpinner("Setting up Drizzle configuration...");
    const drizzleDir = path.join(projectPath, "drizzle");

    await fs.ensureDir(drizzleDir);
    await fs.ensureDir(path.join(drizzleDir, "migrations"));

    // Create schema.ts
    let schemaContent = "";
    switch (database) {
      case "PostgreSQL":
        schemaContent = `import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const examples = pgTable('examples', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
`;
        break;
      case "SQLite":
        schemaContent = `import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const examples = sqliteTable('examples', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().defaultNow(),
});
`;
        break;
      case "MySQL":
        schemaContent = `import { mysqlTable, serial, varchar, timestamp } from 'drizzle-orm/mysql-core';

export const examples = mysqlTable('examples', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
`;
        break;
      default:
        schemaContent = `// Please configure your database schema based on your selected provider
`;
    }

    await fs.writeFile(path.join(drizzleDir, "schema.ts"), schemaContent);

    // Create database config
    let dbConfigContent = "";
    switch (database) {
      case "PostgreSQL":
        dbConfigContent = `import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });
`;
        break;
      case "SQLite":
        dbConfigContent = `import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';

const sqlite = new Database('sqlite.db');
export const db = drizzle(sqlite, { schema });
`;
        break;
      case "MySQL":
        dbConfigContent = `import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

const poolConnection = mysql.createPool({
  uri: process.env.DATABASE_URL,
});

export const db = drizzle(poolConnection, { schema });
`;
        break;
      default:
        dbConfigContent = `// Please configure your database connection based on your selected provider
`;
    }

    await fs.writeFile(path.join(drizzleDir, "index.ts"), dbConfigContent);

    // Create drizzle.config.ts
    const drizzleConfigContent = `import type { Config } from 'drizzle-kit';

export default {
  schema: './drizzle/schema.ts',
  out: './drizzle/migrations',
} satisfies Config;
`;

    await fs.writeFile(
      path.join(projectPath, "drizzle.config.ts"),
      drizzleConfigContent
    );
    configSpinner.succeed("Drizzle configuration created");

    // Update package.json with drizzle scripts
    const packageJsonSpinner = createSpinner(
      "Updating package.json with Drizzle scripts..."
    );
    const packageJsonPath = path.join(projectPath, "package.json");
    const packageJson = await fs.readJson(packageJsonPath);

    if (!packageJson.scripts) {
      packageJson.scripts = {};
    }

    packageJson.scripts["db:generate"] = "drizzle-kit generate:sqlite";
    packageJson.scripts["db:migrate"] = "drizzle-kit migrate:sqlite";
    packageJson.scripts["db:studio"] = "drizzle-kit studio";

    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
    packageJsonSpinner.succeed("Package.json updated with Drizzle scripts");

    // Update env file if needed
    if (database !== "SQLite" && database !== "None") {
      const envSpinner = createSpinner("Setting up database URL...");
      const envPath = path.join(projectPath, ".env");
      let envContent = "";

      if (await fs.pathExists(envPath)) {
        envContent = await fs.readFile(envPath, "utf-8");
      }

      if (!envContent.includes("DATABASE_URL")) {
        let databaseUrl = "";

        switch (database) {
          case "PostgreSQL":
            databaseUrl =
              'DATABASE_URL="postgres://postgres:password@localhost:5432/mydb"';
            break;
          case "MySQL":
            databaseUrl =
              'DATABASE_URL="mysql://root:password@localhost:3306/mydb"';
            break;
        }

        await fs.appendFile(envPath, `\n${databaseUrl}\n`);
        envSpinner.succeed("Database URL added to .env file");
      }
    }

    logger.success("Drizzle setup completed successfully");
  } catch (error) {
    spinner.fail("Failed to setup Drizzle");
    throw error;
  }
}
