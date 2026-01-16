import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BuildYourEvent from './pages/BuildYourEvent';
import AboutUs from './pages/AboutUs';
import Games from './pages/Games';
import ContactUs from './pages/ContactUs';
import { updateMetaTags, addStructuredData, getStructuredData } from './utils/seo';
import './App.css';

function App() {
  useEffect(() => {
    // Initialize SEO meta tags
    updateMetaTags({
      title: 'Next Level Games - #1 Arcade Experience at Festivals & Events',
      description: 'The #1 arcade gaming experience at festivals, corporate events, schools, and universities. Premium entertainment for all ages in Lebanon.',
      keywords: 'arcade games, gaming events, festivals, corporate events, entertainment, Lebanon',
    });

    // Add structured data for search engines
    addStructuredData(getStructuredData());
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} /> 
        <Route path="/build-your-event" element={<BuildYourEvent />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
    </Router>
  );
}

export default App;
