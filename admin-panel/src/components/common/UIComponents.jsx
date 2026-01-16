import React from 'react';

/**
 * Alert Messages Component
 * Displays success and error messages
 */
export const SuccessMessage = ({ message }) => {
  if (!message) return null;
  return <div className="success-message">{message}</div>;
};

export const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return <div className="error-message">{message}</div>;
};

/**
 * Loading Spinner Component
 */
export const LoadingSpinner = ({ message = 'Loading...' }) => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    flexDirection: 'column',
    gap: '10px'
  }}>
    <div className="spinner"></div>
    <p>{message}</p>
  </div>
);

/**
 * Confirmation Modal Component
 */
export const ConfirmModal = ({ 
  isOpen, 
  title, 
  message, 
  onConfirm, 
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger' // 'danger' | 'warning' | 'info'
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content confirm-modal" onClick={e => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onCancel}>
            {cancelText}
          </button>
          <button className={`confirm-btn ${type}`} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Search Input Component
 */
export const SearchInput = ({ value, onChange, placeholder = 'Search...' }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="search-input"
  />
);

/**
 * Status Badge Component
 */
export const StatusBadge = ({ status }) => (
  <span className={`status ${status}`}>{status}</span>
);

/**
 * Empty State Component
 */
export const EmptyState = ({ icon = '📭', title, message }) => (
  <div className="empty-state">
    <span className="empty-icon">{icon}</span>
    <h3>{title}</h3>
    <p>{message}</p>
  </div>
);

const UIComponents = {
  SuccessMessage,
  ErrorMessage,
  LoadingSpinner,
  ConfirmModal,
  SearchInput,
  StatusBadge,
  EmptyState,
};

export default UIComponents;
