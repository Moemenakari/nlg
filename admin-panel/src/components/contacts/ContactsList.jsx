import React, { useState } from 'react';
import { SearchInput, EmptyState } from '../common/UIComponents';

/**
 * Contacts List Component
 * Displays all contact messages with search and status management
 */
const ContactsList = ({ contacts, onStatusChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter contacts based on search
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = async (contactId, newStatus) => {
    await onStatusChange(contactId, newStatus);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return '#FF9800';
      case 'read': return '#2196F3';
      case 'replied': return '#4CAF50';
      default: return '#666';
    }
  };

  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>📩 Received Messages</h2>
        <div className="search-filter-controls">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search messages..."
          />
        </div>
      </div>

      {filteredContacts.length > 0 ? (
        <div className="messages-list">
          {filteredContacts.map(contact => (
            <div 
              key={contact.id} 
              className={`message-card ${contact.status === 'new' ? 'unread' : ''}`}
            >
              <div className="message-header">
                <h4>{contact.name}</h4>
                <select
                  value={contact.status}
                  onChange={(e) => handleStatusChange(contact.id, e.target.value)}
                  className="status-select-small"
                  style={{ borderColor: getStatusColor(contact.status) }}
                >
                  <option value="new">🔵 New</option>
                  <option value="read">📖 Read</option>
                  <option value="replied">✅ Replied</option>
                </select>
              </div>
              <div className="message-details">
                <p>
                  <strong>Email:</strong>{' '}
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </p>
                <p>
                  <strong>Phone:</strong>{' '}
                  <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                </p>
              </div>
              <div className="message-content">
                <strong>Message:</strong>
                <p>{contact.message}</p>
              </div>
              {contact.createdAt && (
                <div className="message-date">
                  <small>
                    Received: {new Date(contact.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </small>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon="📭"
          title={searchTerm ? 'No messages found' : 'No messages yet'}
          message={
            searchTerm
              ? `No messages match "${searchTerm}"`
              : 'Contact messages will appear here'
          }
        />
      )}
    </div>
  );
};

export default ContactsList;
