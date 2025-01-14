const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const db = new sqlite3.Database('./database.sqlite');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Import routes
const userRoutes = require('./routes/usersRoutes');
const newsletterRoutes = require('./routes/newslettersRoutes');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/newsletters', newsletterRoutes);

// Serve API documentation at the root
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
