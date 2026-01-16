const pool = require('../config/db');

// Get all testimonials
exports.getAllTestimonials = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [testimonials] = await connection.execute('SELECT * FROM testimonials ORDER BY createdAt DESC');
    connection.release();

    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create testimonial
exports.createTestimonial = async (req, res) => {
  try {
    const { text, author, role, rating } = req.body;

    console.log('📝 Creating new testimonial from:', author);

    if (!text || !author || !rating) {
      console.log('❌ Testimonial creation failed: Missing required fields');
      return res.status(400).json({ error: 'Text, author, and rating required' });
    }

    const ratingNum = parseInt(rating, 10);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      console.log('❌ Testimonial creation failed: Invalid rating');
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'INSERT INTO testimonials (text, author, role, rating) VALUES (?, ?, ?, ?)',
      [text, author, role || '', ratingNum]
    );
    connection.release();

    console.log(`✅ Testimonial created successfully! ID: ${result.insertId}, Author: "${author}", Rating: ${ratingNum}⭐`);

    res.status(201).json({
      message: 'Testimonial created successfully',
      id: result.insertId
    });
  } catch (error) {
    console.log('❌ Testimonial creation error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// Delete testimonial
exports.deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    
    const [result] = await connection.execute('DELETE FROM testimonials WHERE id = ?', [id]);
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
