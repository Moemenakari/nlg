import React from 'react';
import { Close } from '@mui/icons-material';

/**
 * Booking Details Modal Component
 * Displays full booking information
 */
const BookingDetails = ({ booking, onClose, onStatusChange }) => {
  if (!booking) return null;

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    onStatusChange(booking.id, newStatus);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content booking-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>📋 Booking Details</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            <Close />
          </button>
        </div>

        <div className="modal-body">
          <div className="details-grid">
            <div className="detail-item">
              <label>Client Name</label>
              <p>{booking.name}</p>
            </div>
            <div className="detail-item">
              <label>Email</label>
              <p>
                <a href={`mailto:${booking.email}`}>{booking.email}</a>
              </p>
            </div>
            <div className="detail-item">
              <label>Phone</label>
              <p>
                <a href={`tel:${booking.phone}`}>{booking.phone}</a>
              </p>
            </div>
            <div className="detail-item">
              <label>Event Date</label>
              <p>{booking.eventDate}</p>
            </div>
            <div className="detail-item">
              <label>Event Type</label>
              <p>{booking.eventType || 'N/A'}</p>
            </div>
            <div className="detail-item">
              <label>Total Price</label>
              <p className="price-tag">${booking.totalPrice}</p>
            </div>
            <div className="detail-item full-width">
              <label>Status</label>
              <span className={`status ${booking.status}`}>{booking.status}</span>
            </div>
            <div className="detail-item full-width">
              <label>Notes / Requirements</label>
              <p className="notes-box">
                {booking.notes || 'No special requirements listed.'}
              </p>
            </div>
            {booking.selectedGames && booking.selectedGames.length > 0 && (
              <div className="detail-item full-width">
                <label>Selected Games</label>
                <ul className="games-list">
                  {booking.selectedGames.map((game, index) => (
                    <li key={index}>{game.name || game}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <select
            value={booking.status}
            onChange={handleStatusChange}
            className="status-select-large"
          >
            <option value="pending">Mark as Pending</option>
            <option value="confirmed">Mark as Confirmed</option>
            <option value="cancelled">Mark as Cancelled</option>
          </select>
          <button className="done-btn" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
