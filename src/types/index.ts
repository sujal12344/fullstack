export interface GlobalOptions {
  projectName: string;
  language: "TypeScript" | "JavaScript";
  useTailwind: boolean;
  useClerk: boolean;
  orm: "None" | "Prisma" | "Drizzle" | "Mongoose";
  database?: "None" | "PostgreSQL" | "SQLite" | "MySQL" | "MongoDB";
  initGit: boolean;
  installDeps: boolean;
  useSrcDir: boolean;
  useAppRouter: boolean;
  useTurbopack: boolean;
  importAlias?: string;
  useTemplates: boolean;
  templates?: "ecommerce" | "blog" | "portfolio" | "landingPage";
}
