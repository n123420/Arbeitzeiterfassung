const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Pfad zur SQLite-Datenbank
const dbPath = path.resolve(__dirname, 'database.sqlite');

// Verbindung zur Datenbank herstellen
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Fehler beim Öffnen der Datenbank:', err.message);
  } else {
    console.log('Mit SQLite-Datenbank verbunden.');
  }
});

// Tabelle erstellen, falls sie nicht existiert
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS worktime (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user TEXT NOT NULL,
      date TEXT NOT NULL,
      hours REAL NOT NULL,
      project TEXT NOT NULL,
      comment TEXT,
      status TEXT DEFAULT 'submitted'
    )
  `, (err) => {
    if (err) {
      console.error('Fehler beim Erstellen der Tabelle:', err.message);
    } else {
      console.log('Tabelle "worktime" ist bereit.');
    }
  });
});

module.exports = db;