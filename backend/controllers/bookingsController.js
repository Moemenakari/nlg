const pool = require('../config/db');

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [bookings] = await connection.execute('SELECT * FROM bookings ORDER BY createdAt DESC');
    connection.release();

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single booking
exports.getBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [bookings] = await connection.execute('SELECT * FROM bookings WHERE id = ?', [id]);
    connection.release();

    if (bookings.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json(bookings[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create booking
exports.createBooking = async (req, res) => {
  try {
    const { eventType, eventDate, location, name, email, phone, totalPrice } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone required' });
    }

    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'INSERT INTO bookings (eventType, eventDate, location, name, email, phone, totalPrice, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [eventType, eventDate, location, name, email, phone, totalPrice, 'pending']
    );
    connection.release();

    res.status(201).json({
      message: 'Booking created successfully',
      id: result.insertId
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update booking status
exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'UPDATE bookings SET status = ? WHERE id = ?',
      [status, id]
    );
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({ message: 'Booking updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
