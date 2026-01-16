-- =====================================================
-- Next Level Games - Complete Database Schema
-- =====================================================

-- Drop existing tables if they exist (for fresh install)
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS contacts;
DROP TABLE IF EXISTS testimonials;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS users;

-- =====================================================
-- Users Table ( Authentication)
-- =====================================================
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'admin',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- Games Table (Arcade Games/Products)
-- =====================================================
CREATE TABLE games (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  capacity INT DEFAULT 1,
  spaceRequired VARCHAR(50),
  powerRequired VARCHAR(50),
  usesCoins BOOLEAN DEFAULT FALSE,
  image VARCHAR(500),
  availability ENUM('Available', 'Unavailable', 'Maintenance') DEFAULT 'Available',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- Bookings Table (Event Bookings)
-- =====================================================
CREATE TABLE bookings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  eventType VARCHAR(100),
  eventDate DATE,
  location VARCHAR(255),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  totalPrice DECIMAL(10, 2) DEFAULT 0,
  status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- Contacts Table (Contact Form Submissions)
-- =====================================================
CREATE TABLE contacts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(50),
  message TEXT NOT NULL,
  status ENUM('new', 'read', 'replied') DEFAULT 'new',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- Testimonials Table (Customer Reviews)
-- =====================================================
CREATE TABLE testimonials (
  id INT PRIMARY KEY AUTO_INCREMENT,
  text TEXT NOT NULL,
  author VARCHAR(100) NOT NULL,
  role VARCHAR(100),
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- Insert Default Admin User
-- Password: admin123 (hashed with bcrypt during setup)
-- =====================================================
INSERT INTO users (username, email, password, role) VALUES 
('admin', 'admin@nextlevelgames.com', '$2a$10$YourHashedPasswordHere', 'admin');

-- Note: You MUST update the password hash above by running:
-- const bcrypt = require('bcryptjs');
-- const hash = await bcrypt.hash('123', 10);

-- =====================================================
-- Indexes for Performance
-- =====================================================
CREATE INDEX idx_games_availability ON games(availability);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_date ON bookings(eventDate);
CREATE INDEX idx_contacts_status ON contacts(status);
CREATE INDEX idx_testimonials_rating ON testimonials(rating);

-- =====================================================
-- Schema Version & Notes
-- =====================================================
-- Version: 1.0
-- Created: 2026-01-15
-- Purpose: Production-ready database schema for Next Level Games
-- All tables use InnoDB engine with UTF8MB4 charset
