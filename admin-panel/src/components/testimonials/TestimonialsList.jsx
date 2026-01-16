import React, { useState } from 'react';
import { Add, Edit, Delete } from '@mui/icons-material';
import TestimonialForm from './TestimonialForm';
import { EmptyState } from '../common/UIComponents';

/**
 * Testimonials List Component
 * Displays all testimonials with add, edit, and delete functionality
 */
const TestimonialsList = ({ 
  testimonials, 
  onCreateTestimonial, 
  onUpdateTestimonial, 
  onDeleteTestimonial 
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);

  const handleAddClick = () => {
    setEditingTestimonial(null);
    setShowForm(true);
  };

  const handleEditClick = (testimonial) => {
    setEditingTestimonial(testimonial);
    setShowForm(true);
  };

  const handleDeleteClick = async (testimonialId) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      await onDeleteTestimonial(testimonialId);
    }
  };

  const handleFormSubmit = async (formData, testimonialId) => {
    if (testimonialId) {
      return await onUpdateTestimonial(testimonialId, formData);
    } else {
      return await onCreateTestimonial(formData);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingTestimonial(null);
  };

  const renderStars = (rating) => '⭐'.repeat(rating);

  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>⭐ Testimonials</h2>
        <button className="add-btn" onClick={handleAddClick}>
          <Add /> Add Testimonial
        </button>
      </div>

      {testimonials.length > 0 ? (
        <div className="testimonials-list">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="testimonial-card">
              <p className="rating">{renderStars(testimonial.rating)}</p>
              <p className="text">"{testimonial.text}"</p>
              <p className="author">
                — {testimonial.author} 
                <span className="role">({testimonial.role})</span>
              </p>
              <div className="card-actions">
                <button 
                  className="edit-btn" 
                  onClick={() => handleEditClick(testimonial)}
                  title="Edit testimonial"
                >
                  <Edit />
                </button>
                <button 
                  className="delete-btn" 
                  onClick={() => handleDeleteClick(testimonial.id)}
                  title="Delete testimonial"
                >
                  <Delete />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon="⭐"
          title="No testimonials yet"
          message="Add customer testimonials to showcase on your website"
        />
      )}

      {/* Add/Edit Testimonial Modal */}
      <TestimonialForm
        isOpen={showForm}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        editingTestimonial={editingTestimonial}
      />
    </div>
  );
};

export default TestimonialsList;
