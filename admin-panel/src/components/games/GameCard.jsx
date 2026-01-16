import React from 'react';
import { Edit, Delete } from '@mui/icons-material';
import { API_URL } from '../../services/api';

/**
 * Game Card Component
 * Displays individual game information
 */
const GameCard = ({ game, onEdit, onDelete }) => {
  const imageUrl = game.image 
    ? (game.image.startsWith('http') ? game.image : `${API_URL}${game.image}`)
    : null;

  return (
    <div className="game-card">
      {imageUrl && (
        <img 
          src={imageUrl} 
          alt={game.name}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      )}
      <h3>{game.name}</h3>
      <p className="price">${game.price}</p>
      <p className="capacity">Capacity: {game.capacity}</p>
      {game.usesCoins && <span className="coin-badge">🪙 Coin-Based</span>}
      <div className="card-actions">
        <button 
          className="edit-btn" 
          onClick={() => onEdit(game)}
          title="Edit game"
        >
          <Edit />
        </button>
        <button 
          className="delete-btn" 
          onClick={() => onDelete(game.id)}
          title="Delete game"
        >
          <Delete />
        </button>
      </div>
    </div>
  );
};

export default GameCard;
