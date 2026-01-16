const pool = require('../config/db');

// Get all games
exports.getAllGames = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [games] = await connection.execute('SELECT * FROM games ORDER BY id');
    connection.release();

    res.json(games);
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

    res.json(games[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create game
exports.createGame = async (req, res) => {
  try {
    const { name, description, price, capacity, spaceRequired, powerRequired, usesCoins, availability } = req.body;
    const image = req.file ? `/uploads/games/${req.file.filename}` : null;

    console.log('📝 Creating new game:', name);

    if (!name || !price) {
      console.log('❌ Game creation failed: Name and price required');
      return res.status(400).json({ error: 'Name and price are required' });
    }

    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'INSERT INTO games (name, description, price, capacity, spaceRequired, powerRequired, usesCoins, image, availability) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, description, price, capacity || 1, spaceRequired, powerRequired, usesCoins === 'true' || usesCoins === true, image, availability || 'Available']
    );
    connection.release();

    console.log(`✅ Game created successfully! ID: ${result.insertId}, Name: "${name}", Price: $${price}`);

    res.status(201).json({
      message: 'Game created successfully! It will now appear in the frontend.',
      id: result.insertId,
      game: { id: result.insertId, name, price }
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
    const image = req.file ? `/uploads/games/${req.file.filename}` : undefined;

    const connection = await pool.getConnection();
    
    // Check if game exists
    const [games] = await connection.execute('SELECT * FROM games WHERE id = ?', [id]);
    if (games.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Game not found' });
    }

    const usesCoinsValue = usesCoins === 'true' || usesCoins === true ? 1 : 0;

    const query = image 
      ? 'UPDATE games SET name=?, description=?, price=?, capacity=?, spaceRequired=?, powerRequired=?, usesCoins=?, image=?, availability=? WHERE id=?'
      : 'UPDATE games SET name=?, description=?, price=?, capacity=?, spaceRequired=?, powerRequired=?, usesCoins=?, availability=? WHERE id=?';
    
    const params = image
      ? [name, description, price, capacity, spaceRequired, powerRequired, usesCoinsValue, image, availability, id]
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
