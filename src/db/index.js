// src/db/index.js
import * as SQLite from 'expo-sqlite';

let db;

const ensureDb = async () => {
  if (!db) db = await SQLite.openDatabaseAsync('app_session.db');
  return db;
};

export const initSessionTable = async () => {
  const d = await ensureDb();
  await d.execAsync(`
    CREATE TABLE IF NOT EXISTS session (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      localId TEXT,
      email TEXT
    );
  `);
};

export const saveSession = async (localId, email) => {
  const d = await ensureDb();
  await d.runAsync('DELETE FROM session;');
  await d.runAsync('INSERT INTO session (localId, email) VALUES (?, ?);', [localId, email]);
};

export const getSession = async () => {
  const d = await ensureDb();
  const rows = await d.getAllAsync('SELECT * FROM session LIMIT 1;');
  return rows?.[0] ?? null;
};

export const clearSession = async () => {
  const d = await ensureDb();
  await d.runAsync('DELETE FROM session;');
};
