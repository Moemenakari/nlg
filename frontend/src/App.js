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
      title: 'Arcade Games Lebanon | Event Arcade Rental – Next Level Game',
      description: 'Rent arcade games for events in Lebanon 🎮 Boxing, Basketball, King of the Hammer,Claw machine,popwin,shooting,table hockey,catch stick reflection & more. Perfect for festivals, schools, universities & corporate events across Lebanon.',
      keywords: 'arcade games Lebanon, arcade for events Lebanon, boxing arcade Lebanon, basketball arcade Lebanon, King of the Hammer Lebanon, event games Lebanon, ألعاب أركيد لبنان, ألعاب إيفنتات لبنان, ألعاب مهرجانات لبنان',
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
