const express = require('express');
const cors = require('cors');
const path = require('path');
const worktimeRoutes = require('./routes/worktime');

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/worktime', worktimeRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});