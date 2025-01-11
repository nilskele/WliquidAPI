import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const initDb = async () => {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE
    );
    CREATE TABLE IF NOT EXISTS newsletters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL
    );
  `);

  console.log('Database initialized.');
  await db.close();
};

initDb().catch((err) => console.error(err));
