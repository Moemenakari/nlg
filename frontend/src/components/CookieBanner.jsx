import React, { useState, useEffect } from 'react';
import { initializeGA } from '../utils/analytics';
import './CookieBanner.css';

const CookieBanner = ({ delayMs = 3500 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    if (consent) {
      // If already accepted, initialize GA
      if (consent === 'accepted') {
        initializeGA();
      }
      return;
    }

    // Show banner after animation delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [delayMs]);

  const handleClose = (accepted) => {
    setIsClosing(true);
    
    // Save preference
    localStorage.setItem('cookieConsent', accepted ? 'accepted' : 'declined');
    
    // Initialize GA if accepted
    if (accepted) {
      initializeGA();
    }

    // Hide after animation
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className={`cookie-banner ${isClosing ? 'closing' : ''}`}>
      <div className="cookie-content">
        <span className="cookie-icon">🍪</span>
        <p className="cookie-text">
          We use cookies to enhance your experience
        </p>
      </div>
      <div className="cookie-buttons">
        <button 
          className="cookie-btn decline"
          onClick={() => handleClose(false)}
        >
          Decline
        </button>
        <button 
          className="cookie-btn accept"
          onClick={() => handleClose(true)}
        >
          Accept ✓
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
