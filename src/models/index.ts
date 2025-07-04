import { pgClient } from "../db";
// Posts: Columns: id (primary key), title, content, user_id (foreign key to Users).
// Comments: Columns: id (primary key), content, post_id (foreign key to Posts), user_id (foreign key to Users).

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

  try {
    await pgClient.query(`
        CREATE TABLE IF NOT EXISTS posts (
          id SERIAL PRIMARY KEY,
          title VARCHAR(100) UNIQUE NOT NULL,
          content TEXT NOT NULL,
          user_id INTEGER,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
        );
      `);

    console.log("✅ Posts table created (if not exists)");
  } catch (error) {
    console.log("❌ Error initializing posts table:", error);
    throw error;
  }

  try {
    await pgClient.query(`
        CREATE TABLE IF NOT EXISTS comments (
          id SERIAL PRIMARY KEY,
          content TEXT NOT NULL ,
          post_Id INTEGER,
          FOREIGN KEY (post_Id) REFERENCES posts(id) ON DELETE CASCADE,
          user_Id INTEGER,
          FOREIGN KEY (user_Id) REFERENCES users(id) ON DELETE CASCADE
        );
      `);

    console.log("✅ comments table created (if not exists)");
  } catch (error) {
    console.log("❌ Error initializing comments table:", error);
    throw error;
  }
};
