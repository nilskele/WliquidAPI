const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

// Get users with pagination
const getPagedUsers = (req, res) => {
    const { limit, offset } = req.query;
    const query = `SELECT * FROM users LIMIT ? OFFSET ?`;

    db.all(query, [limit || 10, offset || 0], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(rows);
    });
};

// Get user by ID
const getUserById = (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(row);
    });
};

// Create a new user
const createUser = (req, res) => {
    const { firstName, lastName, email } = req.body;

    if (!firstName || !lastName || !email) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(firstName)) {
        return res.status(400).json({ message: 'First name should not contain numbers' });
    }

    const stmt = db.prepare('INSERT INTO users (firstName, lastName, email) VALUES (?, ?, ?)');
    stmt.run(firstName, lastName, email, function (err) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(201).json({ id: this.lastID, firstName, lastName, email });
    });
    stmt.finalize();
};

const updateUserById = (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;

    if (!firstName || !lastName || !email) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(firstName)) {
        return res.status(400).json({ message: 'First name should not contain numbers' });
    }

    const stmt = db.prepare('UPDATE users SET firstName = ?, lastName = ?, email = ? WHERE id = ?');
    stmt.run(firstName, lastName, email, id, function (err) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ id, firstName, lastName, email });
    });
    stmt.finalize();
};



const deleteUserById = (req, res) => {
    const { id } = req.params;
    const stmt = db.prepare('DELETE FROM users WHERE id = ?');
    stmt.run(id, function (err) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(204).send();
    });
    stmt.finalize();
};

const searchUsersByField = (req, res) => {
    const { field, value } = req.query;

    const allowedFields = ['firstName', 'lastName', 'email']; // Allowed fields
    if (!field || !value || !allowedFields.includes(field)) {
        return res.status(400).json({ message: 'Valid field and value are required' });
    }

    const query = `SELECT * FROM users WHERE ${field} = ?`;
    db.all(query, [value], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        if (rows.length === 0) {
            return res.status(404).json({ message: 'No users found for the given field and value' });
        }

        res.json(rows);
    });
};



module.exports = {
    getPagedUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    searchUsersByField
};
