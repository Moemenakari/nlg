import React, { useState } from 'react';
import { Add } from '@mui/icons-material';
import GameCard from './GameCard';
import GameForm from './GameForm';
import { SearchInput } from '../common/UIComponents';

/**
 * Games List Component
 * Displays all games with search, add, edit, and delete functionality
 */
const GamesList = ({ games, onCreateGame, onUpdateGame, onDeleteGame }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingGame, setEditingGame] = useState(null);

  // Filter games based on search term
  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (game.description && game.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddClick = () => {
    setEditingGame(null);
    setShowForm(true);
  };

  const handleEditClick = (game) => {
    setEditingGame(game);
    setShowForm(true);
  };

  const handleDeleteClick = async (gameId) => {
    if (window.confirm('Are you sure you want to delete this game?')) {
      await onDeleteGame(gameId);
    }
  };

  const handleFormSubmit = async (formData, gameId) => {
    if (gameId) {
      return await onUpdateGame(gameId, formData);
    } else {
      return await onCreateGame(formData);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingGame(null);
  };

  return (
    <div className="tab-content">
      <div className="tab-header">
        <div className="header-left">
          <h2>🎮 Manage Games</h2>
          <div className="search-filter-controls">
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search games..."
            />
          </div>
        </div>
      </div>

      {/* Games Grid with Add Card */}
      <div className="games-grid">
        {/* ADD NEW GAME CARD - Always First */}
        <div 
          className="game-card add-game-card"
          onClick={handleAddClick}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => e.key === 'Enter' && handleAddClick()}
        >
          <div className="add-game-content">
            <Add style={{ fontSize: '60px', color: '#E53935' }} />
            <h3>+ Add New Game</h3>
            <p>Click to add a new product</p>
          </div>
        </div>

        {/* Existing Games */}
        {filteredGames.map(game => (
          <GameCard
            key={game.id}
            game={game}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        ))}
      </div>

      {/* Empty state */}
      {games.length === 0 && (
        <div className="empty-state">
          <span className="empty-icon">🎮</span>
          <h3>No games yet</h3>
          <p>Click "Add New Game" to get started!</p>
        </div>
      )}

      {/* No search results */}
      {games.length > 0 && filteredGames.length === 0 && searchTerm && (
        <div className="empty-state">
          <span className="empty-icon">🔍</span>
          <h3>No games found</h3>
          <p>No games match "{searchTerm}"</p>
        </div>
      )}

      {/* Add/Edit Game Modal */}
      <GameForm
        isOpen={showForm}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        editingGame={editingGame}
      />
    </div>
  );
};

export default GamesList;
