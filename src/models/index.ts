import { pgClient } from "../db";

export const initializeDatabase = async (): Promise<void> => {
  try {
    await pgClient.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("✅ Users table created (if not exists)");
  } catch (error) {
    console.error("❌ Error initializing users table:", error);
    throw error;
  }
};
