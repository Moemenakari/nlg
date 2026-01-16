import React from 'react';
import Layout from '../components/layout/Layout';
import { COLORS } from '../utils/constants';
import { Visibility, Rocket } from '@mui/icons-material';

const AboutUs = () => {
  return (
    <Layout>
      <div style={{ backgroundColor: COLORS.primary.white }}>
        {/* Hero Section with Gradient Background */}
        <div className="pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${COLORS.primary.navy} 0%, ${COLORS.primary.red}40 100%)` }}>
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 rounded-full opacity-10" style={{ backgroundColor: COLORS.primary.red }}></div>
          <div className="absolute bottom-0 left-0 w-48 sm:w-72 h-48 sm:h-72 rounded-full opacity-10" style={{ backgroundColor: COLORS.primary.navy }}></div>
          
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <h1
              className="font-poppins font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4 text-white px-2"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}
            >
              About Our Company: Next Level Games
            </h1>
            <p
              className="text-base sm:text-lg md:text-xl font-semibold text-white px-4"
            >
              Your #1 Source for Outdoor Arcade Fun in Lebanon
            </p>
          </div>
        </div>

        {/* Combined Founders & Goals Section - Creative Layout */}
        <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ background: `linear-gradient(180deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%)` }}>
          {/* Decorative Background Elements */}
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-10" style={{ backgroundColor: COLORS.primary.red }}></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full opacity-10" style={{ backgroundColor: COLORS.primary.navy }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-5" style={{ backgroundColor: COLORS.primary.red }}></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            {/* Section Title */}
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-block mb-3 sm:mb-4">
                <span className="px-4 py-2 rounded-full text-xs sm:text-sm font-bold text-white" style={{ backgroundColor: COLORS.primary.red }}>
                  The Team Behind the Magic
                </span>
              </div>
              <h2
                className="font-poppins font-bold text-3xl sm:text-4xl md:text-5xl mb-4"
                style={{ color: COLORS.primary.navy }}
              >
                Meet the Founders
              </h2>
            </div>

            {/* Main Layout - Founders in Center with Goals Around */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-6">
              
              {/* Vision Card - Left Side */}
              <div className="w-full lg:w-1/3 order-2 lg:order-1">
                <div
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 h-full"
                  style={{ borderLeftColor: COLORS.primary.red }}
                >
                  <div className="p-6 relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300"
                        style={{ backgroundColor: COLORS.primary.red }}
                      >
                        <Visibility style={{ fontSize: '24px', color: 'white' }} />
                      </div>
                      <h3
                        className="font-poppins font-bold text-lg sm:text-xl"
                        style={{ color: COLORS.primary.navy }}
                      >
                        Our Vision
                      </h3>
                    </div>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: COLORS.primary.darkGray }}
                    >
                      To be the leading provider of arcade entertainment across Lebanon, bringing joy, excitement, and nostalgia to every corner of the country.
                    </p>
                  </div>
                </div>
              </div>

              {/* Founders Image - Center */}
              <div className="w-full lg:w-1/3 order-1 lg:order-2 flex justify-center">
                <div
                  className="group relative max-w-xs w-full"
                >
                  {/* Glowing Ring Effect */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-20 blur-xl transform scale-105"
                    style={{ background: `linear-gradient(135deg, ${COLORS.primary.red}, ${COLORS.primary.navy})` }}
                  ></div>
                  
                  {/* Image Container */}
                  <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300">
                    {/* Border Gradient */}
                    <div 
                      className="absolute inset-0 rounded-2xl p-1" 
                      style={{ background: `linear-gradient(135deg, ${COLORS.primary.red}, ${COLORS.primary.navy})` }}
                    >
                      <div className="w-full h-full bg-white rounded-xl"></div>
                    </div>
                    
                    <div className="relative p-1">
                      <img
                        src="/assets/images/ceo.jpg"
                        alt="Moemen & Abdelatif - Co-Founders"
                        className="w-full h-auto object-cover rounded-xl"
                      />
                    </div>
                    
                    {/* Badge */}
                    <div 
                      className="absolute top-3 right-3 px-3 py-1.5 rounded-full text-white text-xs font-bold shadow-lg"
                      style={{ backgroundColor: COLORS.primary.red }}
                    >
                      Co-Founders
                    </div>
                  </div>
                  
                  {/* Names Below Image */}
                  <div className="text-center mt-6">
                    <h3
                      className="font-poppins font-bold text-xl sm:text-2xl mb-1"
                      style={{ color: COLORS.primary.navy }}
                    >
                      Moemen & Abdelatif
                    </h3>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: COLORS.primary.red }}
                    >
                      Gaming Enthusiasts 🎮
                    </p>
                    <p
                      className="text-xs mt-2 px-4"
                      style={{ color: COLORS.primary.darkGray }}
                    >
                      Two passionate gamers bringing unforgettable arcade experiences to Lebanon
                    </p>
                  </div>
                </div>
              </div>

              {/* Mission Card - Right Side */}
              <div className="w-full lg:w-1/3 order-3">
                <div
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-r-4 h-full"
                  style={{ borderRightColor: COLORS.primary.navy }}
                >
                  <div className="p-6 relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300"
                        style={{ backgroundColor: COLORS.primary.navy }}
                      >
                        <Rocket style={{ fontSize: '24px', color: 'white' }} />
                      </div>
                      <h3
                        className="font-poppins font-bold text-lg sm:text-xl"
                        style={{ color: COLORS.primary.navy }}
                      >
                        Our Mission
                      </h3>
                    </div>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: COLORS.primary.darkGray }}
                    >
                      Supplying the best arcade machines for sale and rent, transforming festivals and events into unforgettable, high-energy gaming zones.
                    </p>
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

export default AboutUs;
