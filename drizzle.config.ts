import { defineConfig } from "drizzle-kit";
import fs from "fs";
import path from "path";

// Extremely robust manual .env.local loader
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    // 1. Remove comments
    const [content] = line.split("#");
    if (!content) return;

    // 2. Split on FIRST equals sign only
    const match = content.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || "";

      // 3. Strip surrounding quotes
      if (value.length > 0 && value.startsWith('"') && value.endsWith('"')) {
        value = value.substring(1, value.length - 1);
      } else if (value.length > 0 && value.startsWith("'") && value.endsWith("'")) {
        value = value.substring(1, value.length - 1);
      }
      
      process.env[key] = value.trim();
    }
  });
}

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error(`DATABASE_URL is not defined in .env.local at ${envPath}`);
}

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: dbUrl,
  },
});
