import React, { useState, useEffect, useMemo } from 'react';
import { Add, Close } from '@mui/icons-material';

/**
 * Game Form Component
 * Modal form for creating/editing games
 */
const GameForm = ({ isOpen, onClose, onSubmit, editingGame }) => {
  const initialFormData = useMemo(() => ({
    name: '',
    description: '',
    price: '',
    capacity: '',
    spaceRequired: '',
    powerRequired: '',
    usesCoins: false,
    availability: 'Available',
  }), []);

  const [formData, setFormData] = useState(initialFormData);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Reset form when opening/closing or when editingGame changes
  useEffect(() => {
    if (isOpen && editingGame) {
      setFormData({
        name: editingGame.name || '',
        description: editingGame.description || '',
        price: editingGame.price || '',
        capacity: editingGame.capacity || '',
        spaceRequired: editingGame.spaceRequired || '',
        powerRequired: editingGame.powerRequired || '',
        usesCoins: editingGame.usesCoins || false,
        availability: editingGame.availability || 'Available',
      });
    } else if (isOpen) {
      setFormData(initialFormData);
    }
    setImage(null);
  }, [isOpen, editingGame, initialFormData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Create FormData for file upload
    const submitData = new FormData();
    Object.keys(formData).forEach(key => {
      submitData.append(key, formData[key]);
    });
    if (image) {
      submitData.append('image', image);
    }

    const result = await onSubmit(submitData, editingGame?.id);
    
    setLoading(false);
    if (result?.success) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content game-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editingGame ? '✏️ Edit Game' : '➕ Add New Game'}</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            <Close />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="game-form-modal">
          <div className="form-group">
            <label htmlFor="name">Game Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter game name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter game description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Price ($) *</label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder="e.g., 150"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="capacity">Capacity *</label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                placeholder="e.g., 2"
                value={formData.capacity}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="spaceRequired">Space Required</label>
              <input
                type="text"
                id="spaceRequired"
                name="spaceRequired"
                placeholder="e.g., 3m × 2m"
                value={formData.spaceRequired}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="powerRequired">Power Required</label>
              <input
                type="text"
                id="powerRequired"
                name="powerRequired"
                placeholder="e.g., 2KW"
                value={formData.powerRequired}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="usesCoins"
                checked={formData.usesCoins}
                onChange={handleChange}
              />
              <span>🪙 Coin-Operated Game</span>
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="image">Game Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
            {editingGame?.image && !image && (
              <p className="current-image-note">Current image will be kept if no new image is selected.</p>
            )}
          </div>

          <div className="form-buttons">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn" disabled={loading}>
              <Add /> {loading ? 'Saving...' : (editingGame ? 'Update Game' : '+ Add Game')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GameForm;
