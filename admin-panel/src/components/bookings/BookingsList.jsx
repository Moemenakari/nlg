import React, { useState } from 'react';
import { Visibility } from '@mui/icons-material';
import BookingDetails from './BookingDetails';
import { SearchInput, StatusBadge, EmptyState } from '../common/UIComponents';

/**
 * Bookings List Component
 * Displays all bookings with search, filter, and status management
 */
const BookingsList = ({ bookings, onStatusChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Filter bookings based on search and status
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'All' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (bookingId, newStatus) => {
    await onStatusChange(bookingId, newStatus);
    // Update selected booking if it's the one being changed
    if (selectedBooking && selectedBooking.id === bookingId) {
      setSelectedBooking({ ...selectedBooking, status: newStatus });
    }
  };

  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>📋 Manage Bookings</h2>
        <div className="search-filter-controls">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search bookings..."
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="All">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {filteredBookings.length > 0 ? (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map(booking => (
                <tr key={booking.id}>
                  <td>{booking.name}</td>
                  <td>{booking.email}</td>
                  <td>{booking.phone}</td>
                  <td>{booking.eventDate}</td>
                  <td>${booking.totalPrice}</td>
                  <td>
                    <StatusBadge status={booking.status} />
                  </td>
                  <td className="booking-actions">
                    <button 
                      className="view-btn"
                      onClick={() => setSelectedBooking(booking)}
                      title="View Details"
                    >
                      <Visibility />
                    </button>
                    <select
                      value={booking.status}
                      onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                      className="status-select"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          icon="📋"
          title={searchTerm || statusFilter !== 'All' ? 'No bookings found' : 'No bookings yet'}
          message={
            searchTerm || statusFilter !== 'All'
              ? 'Try adjusting your search or filter'
              : 'Bookings will appear here when customers make reservations'
          }
        />
      )}

      {/* Booking Details Modal */}
      {selectedBooking && (
        <BookingDetails
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default BookingsList;
