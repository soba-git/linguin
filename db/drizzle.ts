// Import Neon serverless client and Drizzle ORM adapter
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";


// Create a Neon SQL client using your database connection URL
// The "!" asserts that DATABASE_URL is always defined
const sqlClient = neon(process.env.DATABASE_URL!);

// Wrap the Neon client with Drizzle ORM for typed queries and schema management
const db = drizzle(sqlClient, {schema});

// Export the database instance so it can be reused across your app
export default db;