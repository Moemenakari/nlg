const pool = require('../config/db');
const { uploadToImgBB } = require('../config/imgbb');

// Get all games
exports.getAllGames = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [games] = await connection.execute('SELECT * FROM games ORDER BY id');
    connection.release();

    res.json(games); // Images are full URLs from ImgBB
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single game
exports.getGame = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [games] = await connection.execute('SELECT * FROM games WHERE id = ?', [id]);
    connection.release();

    if (games.length === 0) {
      return res.status(404).json({ error: 'Game not found' });
    }

    res.json(games[0]); // Image is full URL from ImgBB
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create game
exports.createGame = async (req, res) => {
  try {
    const { name, description, price, capacity, spaceRequired, powerRequired, usesCoins, availability } = req.body;
    
    let imageUrl = null;
    if (req.file) {
      // Upload to ImgBB
      try {
        console.log('📤 Uploading image to ImgBB...');
        imageUrl = await uploadToImgBB(req.file.buffer, req.file.originalname);
        console.log('✅ Image uploaded:', imageUrl);
      } catch (uploadError) {
        console.error('⚠️ Image upload failed, continuing without image:', uploadError.message);
        // Continue without image - don't crash the request
        imageUrl = null;
      }
    }

    console.log('📝 Creating new game:', name);

    if (!name || !price) {
      console.log('❌ Game creation failed: Name and price required');
      return res.status(400).json({ error: 'Name and price are required' });
    }

    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'INSERT INTO games (name, description, price, capacity, spaceRequired, powerRequired, usesCoins, image, availability) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, description, price, capacity || 1, spaceRequired, powerRequired, usesCoins === 'true' || usesCoins === true, imageUrl, availability || 'Available']
    );
    connection.release();

    console.log(`✅ Game created successfully! ID: ${result.insertId}, Name: "${name}", Price: $${price}`);

    res.status(201).json({
      message: 'Game created successfully! It will now appear in the frontend.',
      id: result.insertId,
      game: { id: result.insertId, name, price, image: imageUrl }
    });
  } catch (error) {
    console.log('❌ Game creation error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// Update game
exports.updateGame = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, capacity, spaceRequired, powerRequired, usesCoins, availability } = req.body;
    
    let imageUrl = undefined;
    if (req.file) {
      // Upload to ImgBB
      try {
        console.log('📤 Uploading image to ImgBB...');
        imageUrl = await uploadToImgBB(req.file.buffer, req.file.originalname);
        console.log('✅ Image uploaded:', imageUrl);
      } catch (uploadError) {
        console.error('⚠️ Image upload failed:', uploadError.message);
        // Keep existing image - don't update imageUrl
        imageUrl = undefined;
      }
    }

    const connection = await pool.getConnection();
    
    // Check if game exists
    const [games] = await connection.execute('SELECT * FROM games WHERE id = ?', [id]);
    if (games.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Game not found' });
    }

    const usesCoinsValue = usesCoins === 'true' || usesCoins === true ? 1 : 0;

    const query = imageUrl 
      ? 'UPDATE games SET name=?, description=?, price=?, capacity=?, spaceRequired=?, powerRequired=?, usesCoins=?, image=?, availability=? WHERE id=?'
      : 'UPDATE games SET name=?, description=?, price=?, capacity=?, spaceRequired=?, powerRequired=?, usesCoins=?, availability=? WHERE id=?';
    
    const params = imageUrl
      ? [name, description, price, capacity, spaceRequired, powerRequired, usesCoinsValue, imageUrl, availability, id]
      : [name, description, price, capacity, spaceRequired, powerRequired, usesCoinsValue, availability, id];

    await connection.execute(query, params);
    connection.release();

    res.json({ message: 'Game updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete game
exports.deleteGame = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    
    const [result] = await connection.execute('DELETE FROM games WHERE id = ?', [id]);
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Game not found' });
    }

    res.json({ message: 'Game deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
