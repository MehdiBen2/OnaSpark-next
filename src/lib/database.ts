import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';
import fs from 'fs';

// Ensure a persistent database path for Render
const ensureDatabaseDirectory = () => {
  const baseDir = process.env.RENDER_DATA_DIR || process.cwd();
  const databaseDir = path.join(baseDir, 'database');
  
  if (!fs.existsSync(databaseDir)) {
    fs.mkdirSync(databaseDir, { recursive: true });
  }
  
  return path.join(databaseDir, 'ona_spark.db');
};

const dbPath = process.env.DATABASE_URL || ensureDatabaseDirectory();

// Create a singleton database connection
class DatabaseConnection {
  private static instance: Database | null = null;

  private constructor() {}

  public static async getInstance(): Promise<Database> {
    if (!DatabaseConnection.instance) {
      try {
        DatabaseConnection.instance = await open({
          filename: dbPath,
          driver: sqlite3.Database,
          mode: sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE
        });

        // Enable foreign key support
        await DatabaseConnection.instance.run('PRAGMA foreign_keys = ON');

        // Initial setup with error handling
        try {
          await DatabaseConnection.instance.run(`
            CREATE TABLE IF NOT EXISTS users (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              username TEXT UNIQUE NOT NULL,
              email TEXT UNIQUE NOT NULL,
              password_hash TEXT NOT NULL,
              role TEXT NOT NULL DEFAULT 'user',
              created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
          `);
        } catch (setupError) {
          console.error('Database table setup error:', setupError);
        }
      } catch (error) {
        console.error('Database initialization error:', error);
        throw error;
      }
    }
    return DatabaseConnection.instance;
  }

  // Optional: Add a method to close the database connection
  public static async closeConnection() {
    if (DatabaseConnection.instance) {
      await DatabaseConnection.instance.close();
      DatabaseConnection.instance = null;
    }
  }
}

export default DatabaseConnection;
