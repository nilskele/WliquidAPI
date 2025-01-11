import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const getDbConnection = async () => {
  return open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });
};

const dbService = {
  getAllUsers: async () => {
    const db = await getDbConnection();
    return db.all('SELECT * FROM users');
  },
  // Add other database methods here (CRUD for users, newsletters)
};

export default dbService;
