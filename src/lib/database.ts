import Database from 'better-sqlite3';
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
  private static instance: Database.Database;

  private constructor() {}

  public static getInstance(): Database.Database {
    if (!DatabaseConnection.instance) {
      try {
        DatabaseConnection.instance = new Database(dbPath, { 
          verbose: process.env.NODE_ENV === 'development' ? console.log : undefined
        });

        // Enable foreign key support
        DatabaseConnection.instance.pragma('foreign_keys = ON');

        // Initial setup with error handling
        try {
          DatabaseConnection.instance.exec(`
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

  public static closeConnection() {
    if (DatabaseConnection.instance) {
      DatabaseConnection.instance.close();
    }
  }
}

export default DatabaseConnection;
