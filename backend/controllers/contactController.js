const pool = require('../config/db');

// Get all contacts
exports.getAllContacts = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [contacts] = await connection.execute('SELECT * FROM contacts ORDER BY createdAt DESC');
    connection.release();

    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single contact
exports.getContact = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [contacts] = await connection.execute('SELECT * FROM contacts WHERE id = ?', [id]);
    connection.release();

    if (contacts.length === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json(contacts[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create contact submission
exports.createContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message required' });
    }

    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'INSERT INTO contacts (name, email, phone, message, status) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone, message, 'new']
    );
    connection.release();

    res.status(201).json({
      message: 'Contact submitted successfully',
      id: result.insertId
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update contact status
exports.updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['new', 'read', 'replied'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'UPDATE contacts SET status = ? WHERE id = ?',
      [status, id]
    );
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json({ message: 'Contact updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
