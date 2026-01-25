import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { COLORS, CONTACT_INFO } from '../utils/constants';
import { Phone, Email, LocationOn, WhatsApp, Instagram, Facebook, Send } from '@mui/icons-material';
import { contactAPI } from '../services/api';
import { trackWhatsAppClick } from '../utils/analytics';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      await contactAPI.sendMessage(formData);
      setSuccessMessage('✅ Thank you! Your message has been sent successfully. We will respond soon!');
      setFormData({ name: '', email: '', phone: '', message: '' });
      // Clear message after 5 seconds
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error) {
      setErrorMessage('❌ An error occurred while sending your message. Please try again.');
      console.error('Contact form error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div style={{ backgroundColor: COLORS.primary.white }}>
        {/* Hero Section with Gradient */}
        <div className="pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${COLORS.primary.navy} 0%, ${COLORS.primary.red}40 100%)` }}>
          <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 rounded-full opacity-10" style={{ backgroundColor: COLORS.primary.red }}></div>
          <div className="absolute bottom-0 left-0 w-48 sm:w-72 h-48 sm:h-72 rounded-full opacity-10" style={{ backgroundColor: COLORS.primary.navy }}></div>
          
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <div className="inline-block mb-3 sm:mb-4">
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold text-white" style={{ backgroundColor: COLORS.primary.red }}>
                Get in Touch
              </span>
            </div>
            <h1
              className="font-poppins font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4 text-white px-2"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}
            >
              Contact Us
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white px-4">
              We'd love to hear from you! Let's bring your event to the next level
            </p>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              
              {/* Contact Form */}
              <div className="order-2 lg:order-1">
                <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 sm:p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-5" style={{ backgroundColor: COLORS.primary.red }}></div>
                  
                  <h2 className="font-poppins font-bold text-2xl sm:text-3xl mb-2" style={{ color: COLORS.primary.navy }}>
                    Send us a Message
                  </h2>
                  <p className="text-sm sm:text-base mb-6 sm:mb-8" style={{ color: COLORS.primary.darkGray }}>
                    Fill out the form below and we'll get back to you shortly
                  </p>

                  {successMessage && (
                    <div className="mb-6 p-4 rounded-xl" style={{ backgroundColor: '#4CAF50', color: 'white' }}>
                      {successMessage}
                    </div>
                  )}

                  {errorMessage && (
                    <div className="mb-6 p-4 rounded-xl" style={{ backgroundColor: '#f44336', color: 'white' }}>
                      {errorMessage}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.primary.navy }}>
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.primary.navy }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.primary.navy }}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+961 XX XXX XXX"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.primary.navy }}>
                        Your Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your event..."
                        rows="5"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition-colors resize-none"
                        required
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-xl text-white font-bold text-base sm:text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ backgroundColor: COLORS.primary.red }}
                    >
                      <Send size={20} />
                      {loading ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </div>
              </div>

              {/* Contact Information Cards */}
              <div className="order-1 lg:order-2 space-y-6">
                <h2 className="font-poppins font-bold text-2xl sm:text-3xl mb-6" style={{ color: COLORS.primary.navy }}>
                  Get in Touch
                </h2>

                {/* Phone Card */}
                <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 transform hover:-translate-y-1 border-l-4" style={{ borderLeftColor: COLORS.primary.red }}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: COLORS.primary.red }}>
                      <Phone style={{ fontSize: '24px', color: 'white' }} />
                    </div>
                    <div>
                      <h3 className="font-poppins font-bold text-lg mb-2" style={{ color: COLORS.primary.navy }}>
                        Call Us
                      </h3>
                      <p className="text-sm sm:text-base" style={{ color: COLORS.primary.darkGray }}>
                        {CONTACT_INFO.phone}
                      </p>
                      <p className="text-xs sm:text-sm mt-1" style={{ color: COLORS.primary.darkGray }}>
                        Available 24/7 for support
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email Card */}
                <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 transform hover:-translate-y-1 border-l-4" style={{ borderLeftColor: COLORS.primary.red }}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: COLORS.primary.red }}>
                      <Email style={{ fontSize: '24px', color: 'white' }} />
                    </div>
                    <div>
                      <h3 className="font-poppins font-bold text-lg mb-2" style={{ color: COLORS.primary.navy }}>
                        Email Us
                      </h3>
                      <p className="text-sm sm:text-base break-all" style={{ color: COLORS.primary.darkGray }}>
                        {CONTACT_INFO.email}
                      </p>
                      <p className="text-xs sm:text-sm mt-1" style={{ color: COLORS.primary.darkGray }}>
                        We'll respond within 24 hours
                      </p>
                    </div>
                  </div>
                </div>

                {/* Location Card */}
                <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 transform hover:-translate-y-1 border-l-4" style={{ borderLeftColor: COLORS.primary.red }}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: COLORS.primary.red }}>
                      <LocationOn style={{ fontSize: '24px', color: 'white' }} />
                    </div>
                    <div>
                      <h3 className="font-poppins font-bold text-lg mb-2" style={{ color: COLORS.primary.navy }}>
                        Visit Us
                      </h3>
                      <p className="text-sm sm:text-base" style={{ color: COLORS.primary.darkGray }}>
                        {CONTACT_INFO.address}
                      </p>
                      <p className="text-xs sm:text-sm mt-1" style={{ color: COLORS.primary.darkGray }}>
                        Open by appointment
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Media Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6" style={{ background: `linear-gradient(135deg, ${COLORS.primary.navy}, ${COLORS.primary.red}40)` }}>
                  <h3 className="font-poppins font-bold text-lg mb-4 text-white">
                    Follow Us on Social Media
                  </h3>
                   <div className="flex gap-4">
                    <a href="https://wa.me/96170420110" target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick()} className="w-12 h-12 rounded-xl bg-white flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-md">
                      <WhatsApp style={{ fontSize: '24px' }} className="text-green-500" />
                    </a>
                    <a href="https://instagram.com/nextlevelgame_arcades" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-md">
                      <Instagram style={{ fontSize: '24px' }} className="text-pink-500" />
                    </a>
                    <a href="https://www.facebook.com/share/1D5uGhWqMg/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-md">
                      <Facebook style={{ fontSize: '24px' }} className="text-blue-600" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
