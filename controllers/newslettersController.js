const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

// Get newsletters with pagination
const getPagedNewsletters = (req, res) => {
    const { limit, offset } = req.query;
    const query = `SELECT * FROM newsletters LIMIT ? OFFSET ?`;

    db.all(query, [limit || 10, offset || 0], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(rows);
    });
};

// Get newsletter by ID
const getNewsletterById = (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM newsletters WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'Newsletter not found' });
        }
        res.json(row);
    });
};

// Create a new newsletter
const createNewsletter = (req, res) => {
    const { title, content, category } = req.body;

    if (!title || !content || !category) {
        return res.status(400).json({ message: 'All fields (title, content, category) are required' });
    }

    const stmt = db.prepare('INSERT INTO newsletters (title, content, category) VALUES (?, ?, ?)');
    stmt.run(title, content, category, function (err) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(201).json({ id: this.lastID, title, content, category });
    });
    stmt.finalize();
};


// Update newsletter by ID
const updateNewsletterById = (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const stmt = db.prepare('UPDATE newsletters SET title = ?, content = ? WHERE id = ?');
    stmt.run(title, content, id, function (err) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Newsletter not found' });
        }
        res.json({ id, title, content });
    });
    stmt.finalize();
};

// Delete newsletter by ID
const deleteNewsletterById = (req, res) => {
    const { id } = req.params;
    const stmt = db.prepare('DELETE FROM newsletters WHERE id = ?');
    stmt.run(id, function (err) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Newsletter not found' });
        }
        res.status(204).send();
    });
    stmt.finalize();
};

const searchByCategory = (req, res) => {
    const { category } = req.query;

    if (!category) {
        return res.status(400).json({ message: 'Category is required' });
    }

    const query = 'SELECT * FROM newsletters WHERE category = ?';
    db.all(query, [category], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (rows.length === 0) {
            return res.status(404).json({ message: 'No newsletters found for the given category' });
        }
        res.json(rows);
    });
};


module.exports = {
    getPagedNewsletters,
    getNewsletterById,
    createNewsletter,
    updateNewsletterById,
    deleteNewsletterById,
    searchByCategory
};

