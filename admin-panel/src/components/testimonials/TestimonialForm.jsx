import React, { useState, useEffect, useMemo } from 'react';
import { Close } from '@mui/icons-material';

/**
 * Testimonial Form Component
 * Modal form for creating/editing testimonials
 */
const TestimonialForm = ({ isOpen, onClose, onSubmit, editingTestimonial }) => {
  const initialFormData = useMemo(() => ({
    text: '',
    author: '',
    role: '',
    rating: 5,
  }), []);

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);

  // Reset form when opening/closing
  useEffect(() => {
    if (isOpen && editingTestimonial) {
      setFormData({
        text: editingTestimonial.text || '',
        author: editingTestimonial.author || '',
        role: editingTestimonial.role || '',
        rating: editingTestimonial.rating || 5,
      });
    } else if (isOpen) {
      setFormData(initialFormData);
    }
  }, [isOpen, editingTestimonial, initialFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await onSubmit(formData, editingTestimonial?.id);
    
    setLoading(false);
    if (result?.success) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editingTestimonial ? '✏️ Edit Testimonial' : '➕ Add Testimonial'}</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            <Close />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="testimonial-form">
          <div className="form-group">
            <label htmlFor="text">Testimonial Text *</label>
            <textarea
              id="text"
              name="text"
              placeholder="What did the customer say?"
              value={formData.text}
              onChange={handleChange}
              required
              rows={4}
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">Author Name *</label>
            <input
              type="text"
              id="author"
              name="author"
              placeholder="e.g., John Smith"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Role / Title *</label>
            <input
              type="text"
              id="role"
              name="role"
              placeholder="e.g., Event Manager, CEO"
              value={formData.role}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="rating">Rating</label>
            <select
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
            >
              <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
              <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
              <option value={3}>⭐⭐⭐ (3 Stars)</option>
              <option value={2}>⭐⭐ (2 Stars)</option>
              <option value={1}>⭐ (1 Star)</option>
            </select>
          </div>

          <div className="form-buttons">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn" disabled={loading}>
              {loading ? 'Saving...' : (editingTestimonial ? 'Update' : 'Add Testimonial')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestimonialForm;
