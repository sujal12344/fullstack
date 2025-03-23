import { execa } from "execa";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { createSpinner } from "../utils/spinner.js";
import { logger } from "../utils/logger.js";
import { getGlobalOptions } from "./nextjs.js";
import { GlobalOptions } from "../types/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = path.join(__dirname, "..", "..");

export async function setupORM(
  projectPath: string,
  orm: GlobalOptions["orm"],
  database?: GlobalOptions["database"]
): Promise<void> {
  try {
    if (orm === "Prisma") {
      await setupPrisma(projectPath, database);
    } else if (orm === "Drizzle" && database !== "MongoDB") {
      await setupDrizzle(projectPath, database);
    } else if (orm === "Mongoose" && database === "MongoDB") {
      await setupMongoose(projectPath);
    }
  } catch (error) {
    logger.error("Failed to setup ORM", error);
    throw error;
  }
}

async function setupPrisma(
  projectPath: string,
  database?: GlobalOptions["database"]
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

async function setupMongoose(projectPath: string): Promise<void> {
  const spinner = createSpinner("Installing Mongoose...");
  const globalOptions = getGlobalOptions();

  try {
    // Install Mongoose
    await execa("npm", ["install", "mongoose"], { cwd: projectPath });
    spinner.succeed("Mongoose installed successfully");

    // Create lib directory if it doesn't exist
    const libDirPath = path.join(
      projectPath,
      globalOptions.useSrcDir ? "src/lib" : "lib"
    );
    await fs.ensureDir(libDirPath);

    // Create mongoose connection file
    const dbConfigSpinner = createSpinner("Creating Mongoose configuration...");

    const mongooseConnectContent = `import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
`;

    await fs.writeFile(
      path.join(libDirPath, "mongoose.ts"),
      mongooseConnectContent
    );
    dbConfigSpinner.succeed("Mongoose configuration created");

    // Create models directory and example model
    const modelsSpinner = createSpinner("Creating example model...");
    const modelsDirPath = path.join(
      projectPath,
      globalOptions.useSrcDir ? "src/models" : "models"
    );
    await fs.ensureDir(modelsDirPath);

    const exampleModelContent = `import mongoose from 'mongoose';

const ExampleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  description: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Example || mongoose.model('Example', ExampleSchema);
`;

    await fs.writeFile(
      path.join(modelsDirPath, "Example.ts"),
      exampleModelContent
    );
    modelsSpinner.succeed("Example model created");

    // Create environment file with MongoDB URI if it doesn't exist
    const envPath = path.join(projectPath, ".env");
    let envContent = "";

    if (await fs.pathExists(envPath)) {
      envContent = await fs.readFile(envPath, "utf-8");
    }

    if (!envContent.includes("MONGODB_URI")) {
      const envSpinner = createSpinner("Setting up MongoDB URI...");
      const mongoDbUrl = 'MONGODB_URI="mongodb://localhost:27017/myapp"';
      await fs.appendFile(envPath, `\n${mongoDbUrl}\n`);
      envSpinner.succeed("MongoDB URI added to .env file");
    }

    // Create an API example to use the model
    if (globalOptions.useAppRouter) {
      const apiSpinner = createSpinner("Creating example API route...");
      const apiDirPath = path.join(
        projectPath,
        globalOptions.useSrcDir
          ? "src/app/api/examples/route.ts"
          : "app/api/examples/route.ts"
      );

      await fs.ensureDir(path.dirname(apiDirPath));

      const apiRouteContent = `import { NextResponse } from 'next/server';
import dbConnect from '${
        globalOptions.useSrcDir
          ? "../../../lib/mongoose"
          : "../../../lib/mongoose"
      }';
import Example from '${
        globalOptions.useSrcDir
          ? "../../../models/Example"
          : "../../../models/Example"
      }';

export async function GET() {
  try {
    await dbConnect();
    const examples = await Example.find({});
    return NextResponse.json(examples);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch examples' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await dbConnect();
    
    const example = await Example.create(body);
    return NextResponse.json(example, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create example' }, { status: 500 });
  }
}
`;

      await fs.writeFile(apiDirPath, apiRouteContent);
      apiSpinner.succeed("Example API route created");
    } else {
      // For pages directory
      const apiSpinner = createSpinner("Creating example API route...");
      const apiDirPath = path.join(
        projectPath,
        globalOptions.useSrcDir
          ? "src/pages/api/examples.ts"
          : "pages/api/examples.ts"
      );

      await fs.ensureDir(path.dirname(apiDirPath));

      const apiRouteContent = `import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '${
        globalOptions.useSrcDir ? "../../lib/mongoose" : "../../lib/mongoose"
      }';
import Example from '${
        globalOptions.useSrcDir
          ? "../../models/Example"
          : "../../models/Example"
      }';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const examples = await Example.find({});
        res.status(200).json(examples);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch examples' });
      }
      break;
    case 'POST':
      try {
        const example = await Example.create(req.body);
        res.status(201).json(example);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create example' });
      }
      break;
    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}
`;

      await fs.writeFile(apiDirPath, apiRouteContent);
      apiSpinner.succeed("Example API route created");
    }

    logger.success("Mongoose setup completed successfully");
  } catch (error) {
    spinner.fail("Failed to setup Mongoose");
    throw error;
  }
}
