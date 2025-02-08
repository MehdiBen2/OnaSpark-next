import Database from 'better-sqlite3';
import path from 'path';

// Ensure the database is created in a persistent location
const dbPath = path.resolve(process.cwd(), 'ona_spark.db');

// Create a singleton database connection
class DatabaseConnection {
  private static instance: Database.Database;

  private constructor() {}

  public static getInstance(): Database.Database {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new Database(dbPath, { 
        verbose: console.log // Optional: log SQL queries
      });

      // Enable foreign key support
      DatabaseConnection.instance.pragma('foreign_keys = ON');

      // Initial setup
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
