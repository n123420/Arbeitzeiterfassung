const express = require('express');
const router = express.Router();
const db = require('../db');

// Neuen Eintrag speichern
router.post('/', (req, res) => {
  const { user, date, hours, project, comment } = req.body;
  db.run(
    `INSERT INTO worktime (user, date, hours, project, comment) VALUES (?, ?, ?, ?, ?)`,
    [user, date, hours, project, comment],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// Alle Einträge abrufen
router.get('/', (req, res) => {
  db.all(`SELECT * FROM worktime`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Eintrag freigeben
router.put('/:id/finalize', (req, res) => {
  const id = req.params.id;
  db.run(
    `UPDATE worktime SET status = 'accepted' WHERE id = ?`,
    [id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Eintrag übermittelt' });
    }
  );
});

// Eintrag löschen
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.run(`DELETE FROM worktime WHERE id = ?`, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Eintrag nicht gefunden' });
    }
    res.json({ message: 'Eintrag gelöscht' });
  });
});

module.exports = router;