export interface GlobalOptions {
  projectName: string;
  language: "TypeScript" | "JavaScript";
  useClerk: boolean;
  orm: "None" | "Prisma" | "Drizzle" | "Mongoose";
  database?: "None" | "PostgreSQL" | "SQLite" | "MySQL" | "MongoDB";
  initGit: boolean;
  installDeps: boolean;
  useSrcDir: boolean;
  useTemplates: boolean;
  templates?: "ecommerce" | "blog" | "portfolio" | "landingPage";
}
