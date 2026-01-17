import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { CountUp } from 'use-count-up';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { gamesAPI, getImageUrl } from '../services/api';

// Icons imports
import {
  ArrowForward,
  Info,
  Close,
  Celebration,
  Games,
  LocationOn,
  Favorite,
  FavoriteBorder,
  PhotoCamera,
  DateRange,
  ChevronLeft,
  ChevronRight,
  Star,
  ExpandMore,
  Phone,
  WhatsApp,
  Email,
  EmojiEvents,
} from '@mui/icons-material';

// Utils imports
import { COLORS, TESTIMONIALS, FAQ_ITEMS, CONTACT_INFO } from '../utils/constants';

// ==================== OPENING ANIMATION - GLITCH EFFECT ====================
const OpeningAnimation = ({ onComplete }) => {
  const [showAnimation, setShowAnimation] = useState(true);
  const [glitchPhase, setGlitchPhase] = useState(0);

  React.useEffect(() => {
    // Glitch phases timing
    const phase1 = setTimeout(() => setGlitchPhase(1), 300);
    const phase2 = setTimeout(() => setGlitchPhase(2), 600);
    const phase3 = setTimeout(() => setGlitchPhase(3), 1000);
    const phase4 = setTimeout(() => setGlitchPhase(4), 1400);
    
    const timer = setTimeout(() => {
      setShowAnimation(false);
      onComplete();
    }, 2750); // 2.75 seconds

    return () => {
      clearTimeout(phase1);
      clearTimeout(phase2);
      clearTimeout(phase3);
      clearTimeout(phase4);
      clearTimeout(timer);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setShowAnimation(false);
    onComplete();
  };

  if (!showAnimation) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background: '#0a0a0f',
      }}
    >
      {/* Scanlines overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
          opacity: 0.5,
        }}
      />

      {/* CRT screen flicker */}
      <motion.div
        animate={{
          opacity: [0.97, 1, 0.98, 1, 0.97],
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          repeatType: "mirror"
        }}
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0f 100%)',
        }}
      />

      {/* Skip button */}
      <button
        onClick={handleSkip}
        className="absolute top-4 sm:top-6 right-4 sm:right-6 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-all z-40 text-sm border border-red-500/30"
      >
        <Close style={{ fontSize: '20px' }} />
      </button>

      {/* Glitch RGB background effects */}
      <motion.div
        animate={{
          x: glitchPhase >= 1 ? [0, -5, 5, -3, 0] : 0,
          opacity: glitchPhase >= 1 ? [0, 0.8, 0.3, 0.9, 0.7] : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute w-[500px] h-[500px] rounded-full blur-3xl"
        style={{ backgroundColor: '#ff0040' }}
      />
      <motion.div
        animate={{
          x: glitchPhase >= 1 ? [0, 5, -5, 3, 0] : 0,
          opacity: glitchPhase >= 1 ? [0, 0.6, 0.4, 0.7, 0.5] : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut", delay: 0.05 }}
        className="absolute w-[400px] h-[400px] rounded-full blur-3xl"
        style={{ backgroundColor: '#00ffff' }}
      />

      {/* Main logo container */}
      <div className="relative z-20 flex flex-col items-center">
        
        {/* Glitch logo layers */}
        <div className="relative">
          {/* Red channel - offset left */}
          <motion.img
            src="/assets/images/logo-white.jpg"
            alt=""
            className="absolute w-64 sm:w-80 md:w-96 h-auto"
            initial={{ opacity: 0, x: 0 }}
            animate={{
              opacity: glitchPhase >= 2 ? [0, 0.8, 0, 0.5, 0] : 0,
              x: glitchPhase >= 2 ? [-8, -4, -10, -2, 0] : 0,
            }}
            transition={{ duration: 0.5, repeat: glitchPhase < 4 ? Infinity : 0, repeatDelay: 0.2 }}
            style={{
              filter: 'sepia(100%) saturate(500%) hue-rotate(-50deg) brightness(1.2)',
              mixBlendMode: 'screen',
            }}
          />
          
          {/* Cyan channel - offset right */}
          <motion.img
            src="/assets/images/logo-white.jpg"
            alt=""
            className="absolute w-64 sm:w-80 md:w-96 h-auto"
            initial={{ opacity: 0, x: 0 }}
            animate={{
              opacity: glitchPhase >= 2 ? [0, 0.8, 0, 0.5, 0] : 0,
              x: glitchPhase >= 2 ? [8, 4, 10, 2, 0] : 0,
            }}
            transition={{ duration: 0.5, repeat: glitchPhase < 4 ? Infinity : 0, repeatDelay: 0.3 }}
            style={{
              filter: 'sepia(100%) saturate(500%) hue-rotate(140deg) brightness(1.2)',
              mixBlendMode: 'screen',
            }}
          />

          {/* Main logo */}
          <motion.img
            src="/assets/images/logo-white.jpg"
            alt="Next Level Games"
            className="relative w-64 sm:w-80 md:w-96 h-auto"
            initial={{ opacity: 0, scale: 1.5, filter: 'blur(20px)' }}
            animate={{
              opacity: glitchPhase >= 1 ? 1 : 0,
              scale: glitchPhase >= 1 ? 1 : 1.5,
              filter: glitchPhase >= 3 ? 'blur(0px)' : 'blur(10px)',
              y: glitchPhase >= 2 ? [0, -2, 3, -1, 0] : 0,
            }}
            transition={{ 
              duration: 0.6, 
              ease: "easeOut",
              y: { duration: 0.15, repeat: glitchPhase < 4 ? 3 : 0 }
            }}
            style={{
              filter: glitchPhase >= 4 ? 'drop-shadow(0 0 30px rgba(229, 57, 53, 0.8)) drop-shadow(0 0 60px rgba(229, 57, 53, 0.4))' : undefined,
            }}
          />

          {/* Neon glow pulse */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: glitchPhase >= 4 ? [0.4, 0.8, 0.4] : 0,
              scale: glitchPhase >= 4 ? [0.95, 1.05, 0.95] : 1,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 -z-10 blur-3xl"
            style={{
              background: `radial-gradient(circle, ${COLORS.primary.red}60, transparent 70%)`,
            }}
          />
        </div>

        {/* Glitch text effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: glitchPhase >= 3 ? 1 : 0,
            y: glitchPhase >= 3 ? 0 : 20,
          }}
          transition={{ duration: 0.4 }}
          className="mt-8 text-center relative"
        >
          {/* Glitch text layers */}
          <div className="relative">
            <motion.h2 
              className="absolute font-poppins font-bold text-xl sm:text-2xl tracking-wider"
              animate={{
                x: glitchPhase >= 3 && glitchPhase < 4 ? [-3, 2, -1, 0] : 0,
                opacity: glitchPhase >= 3 && glitchPhase < 4 ? [0.8, 0, 0.5, 0] : 0,
              }}
              transition={{ duration: 0.2, repeat: glitchPhase < 4 ? Infinity : 0, repeatDelay: 0.5 }}
              style={{ color: '#ff0040', left: '-2px' }}
            >
              NEXT LEVEL GAME-ARCADES
            </motion.h2>
            <motion.h2 
              className="absolute font-poppins font-bold text-xl sm:text-2xl tracking-wider"
              animate={{
                x: glitchPhase >= 3 && glitchPhase < 4 ? [3, -2, 1, 0] : 0,
                opacity: glitchPhase >= 3 && glitchPhase < 4 ? [0.8, 0, 0.5, 0] : 0,
              }}
              transition={{ duration: 0.2, repeat: glitchPhase < 4 ? Infinity : 0, repeatDelay: 0.6 }}
              style={{ color: '#00ffff', left: '2px' }}
            >
              NEXT LEVEL GAME-ARCADES
            </motion.h2>
            <h2 
              className="relative font-poppins font-bold text-xl sm:text-2xl tracking-wider text-white"
              style={{
                textShadow: glitchPhase >= 4 ? '0 0 10px rgba(229, 57, 53, 0.8), 0 0 20px rgba(229, 57, 53, 0.5), 0 0 40px rgba(229, 57, 53, 0.3)' : 'none',
              }}
            >
              NEXT LEVEL GAME-ARCADES
            </h2>
          </div>

          {/* Animated underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: glitchPhase >= 4 ? 1 : 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-1 mt-3 mx-auto rounded-full origin-center"
            style={{ 
              backgroundColor: COLORS.primary.red,
              boxShadow: '0 0 10px rgba(229, 57, 53, 0.8), 0 0 20px rgba(229, 57, 53, 0.5)',
              width: '100%',
            }}
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: glitchPhase >= 4 ? 1 : 0,
              y: glitchPhase >= 4 ? 0 : 10,
            }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-4 text-gray-400 text-sm tracking-widest uppercase"
          >
            Level Up Your Event
          </motion.p>
        </motion.div>
      </div>

      {/* Random glitch bars */}
      {glitchPhase >= 2 && glitchPhase < 4 && (
        <>
          <motion.div
            animate={{
              x: [-1000, 1000],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 0.8 }}
            className="absolute h-2 w-full bg-red-500/30"
            style={{ top: '30%' }}
          />
          <motion.div
            animate={{
              x: [1000, -1000],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 1.2 }}
            className="absolute h-1 w-full bg-cyan-500/30"
            style={{ top: '60%' }}
          />
        </>
      )}
    </motion.div>
  );
};

// ==================== HERO SECTION ====================
const HeroSection = () => {
  const navigate = useNavigate();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 py-20 sm:py-0"
      style={{
        backgroundImage: 'url(/assets/images/background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundAttachment: 'scroll',
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7))',
        }}
      />

      {/* Decorative animated circles */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-10 right-10 w-32 sm:w-64 h-32 sm:h-64 rounded-full"
        style={{ backgroundColor: COLORS.primary.red }}
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
        className="absolute bottom-20 left-10 w-40 sm:w-72 h-40 sm:h-72 rounded-full"
        style={{ backgroundColor: COLORS.primary.navy }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center text-white max-w-5xl mx-auto"
      >
        <motion.div
          variants={itemVariants}
          className="inline-block mb-4 sm:mb-6"
        >
          <span className="px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-bold text-white backdrop-blur-sm flex items-center gap-2" style={{ backgroundColor: 'rgba(229, 57, 53, 0.9)' }}>
            <Games style={{ fontSize: '16px' }} />
            #1 Arcade Games Rental Lebanon
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="font-poppins font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 leading-tight px-2"
          style={{
            textShadow: '2px 2px 12px rgba(0,0,0,0.7)',
          }}
        >
          Arcade Games for Events in Lebanon | <span style={{ color: COLORS.primary.yellow }}>Next Level Game</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="font-inter font-light text-base sm:text-lg md:text-xl mb-6 sm:mb-8 leading-relaxed px-4 max-w-4xl mx-auto"
        >
          Bring the ultimate arcade experience to your event anywhere in Lebanon. From{' '}
          <span className="font-bold" style={{ color: COLORS.primary.yellow }}>
            boxing machines
          </span>{' '}to{' '}
          <span className="font-bold" style={{ color: COLORS.primary.yellow }}>
            basketball arcades
          </span>, we deliver professional gaming entertainment for festivals, corporate events, schools, and celebrations across{' '}
          <span className="font-bold" style={{ color: COLORS.primary.red }}>
            Beirut, Tripoli, Sidon
          </span>, and all Lebanese cities.
        </motion.p>
        
        <motion.p
          variants={itemVariants}
          className="font-inter font-semibold text-base sm:text-lg md:text-xl mb-8 sm:mb-10 px-4"
          style={{ color: COLORS.primary.yellow }}
        >
          نوفر ألعاب أركيد احترافية لجميع الإيفنتات والمهرجانات في لبنان
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
        >
          <button
            onClick={() => navigate('/build-your-event')}
            style={{ backgroundColor: COLORS.primary.red }}
            className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 rounded-xl text-white font-semibold text-base sm:text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Build Your Festival Now
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowForward style={{ fontSize: '20px' }} />
            </motion.div>
          </button>

          <button
            onClick={() => navigate('/about-us')}
            className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 rounded-xl text-white font-semibold text-base sm:text-lg flex items-center justify-center gap-2 border-2 border-white hover:bg-white hover:text-gray-900 transition-all duration-300 backdrop-blur-sm"
          >
            Why We Are The Best?
            <Info style={{ fontSize: '20px' }} />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

// ==================== QUICK STATS LINE ====================
const QuickStatsLine = () => {
  const stats = [
    { icon: Games, label: '13 Games' },
    { icon: Celebration, label: '300+ Events' },
    { icon: LocationOn, label: 'All Lebanon' },
  ];

  return (
    <section
      className="w-full py-4 sm:py-6 border-b"
      style={{
        backgroundColor: COLORS.primary.white,
        borderColor: COLORS.primary.borderGray,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row flex-wrap items-center justify-center gap-4 sm:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="flex items-center gap-2 sm:gap-3 min-w-[100px] sm:min-w-[120px] justify-center">
                <Icon
                  style={{
                    fontSize: '24px',
                    color: COLORS.primary.red,
                  }}
                  className="sm:text-[28px]"
                />
                <span
                  className="font-inter font-semibold text-sm sm:text-base"
                  style={{ color: COLORS.primary.mediumGray }}
                >
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ==================== FEATURED GAMES ====================
const FeaturedGames = () => {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState({});
  const [likedGames, setLikedGames] = useState({});


  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await gamesAPI.getAll();
        setGames(data.slice(0, 6)); // Show first 6 games
        // Initialize likes
        const initialLikes = {};
        data.forEach(game => {
          initialLikes[game.id] = 100 + Math.floor(Math.random() * 150);
        });
        setLikes(initialLikes);
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const handleLike = (gameId) => {
    setLikedGames((prev) => ({
      ...prev,
      [gameId]: !prev[gameId],
    }));
    setLikes((prev) => ({
      ...prev,
      [gameId]: prev[gameId] + (likedGames[gameId] ? -1 : 1),
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      className="w-full py-12 sm:py-16 md:py-20"
      style={{ backgroundColor: COLORS.primary.white }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <div className="inline-block mb-3 sm:mb-4">
            <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold text-white flex items-center gap-2 justify-center" style={{ backgroundColor: COLORS.primary.red }}>
              <Games style={{ fontSize: '16px' }} />
              Popular Games
            </span>
          </div>
          <h2
            className="font-poppins font-bold text-2xl sm:text-3xl md:text-4xl"
            style={{ color: COLORS.primary.darkGray }}
          >
            Our Featured Games
          </h2>
        </motion.div>

        {loading ? (
          <div className="col-span-full text-center py-12">
            <p className="text-lg" style={{ color: COLORS.primary.darkGray }}>Loading featured games...</p>
          </div>
        ) : games.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-lg" style={{ color: COLORS.primary.darkGray }}>No games available</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-5 md:grid-cols-3 lg:grid-cols-4"
          >
            {games.map((game) => (
              <motion.div
                key={game.id}
                variants={cardVariants}
                whileHover={{
                  scale: 1.05,
                  y: -8,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                }}
                className="flex flex-col rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform"
                style={{
                  backgroundColor: COLORS.primary.white,
                  border: `2px solid ${COLORS.primary.borderGray}`,
                }}
              >
                <div className="relative w-full bg-gray-200 overflow-hidden group" style={{ paddingBottom: '100%' }}>
                  <motion.img
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.4 }}
                    src={game.image ? getImageUrl(game.image) : `https://via.placeholder.com/300x300?text=${encodeURIComponent(game.name)}`}
                    alt={game.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/300x300?text=${encodeURIComponent(game.name)}`;
                    }}
                  />

                  {/* Overlay gradient on hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
                  />

                  <motion.button
                    onClick={() => handleLike(game.id)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all z-10"
                  >
                    {likedGames[game.id] ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                      >
                        <Favorite
                          style={{
                            fontSize: '20px',
                            color: COLORS.primary.red,
                          }}
                        />
                      </motion.div>
                    ) : (
                      <FavoriteBorder
                        style={{
                          fontSize: '20px',
                          color: COLORS.primary.red,
                        }}
                      />
                    )}
                  </motion.button>
                </div>

                <div className="p-3 md:p-4 flex flex-col flex-grow">
                  <h3
                    className="font-poppins font-bold text-sm md:text-base mb-1 line-clamp-2"
                    style={{ color: COLORS.primary.darkGray }}
                  >
                    {game.name}
                  </h3>

                  <p
                    className="text-xs md:text-sm mb-3 line-clamp-2 flex-grow"
                    style={{ color: COLORS.primary.mediumGray }}
                  >
                    {game.description}
                  </p>

                  <div className="flex items-center gap-1 mb-3">
                    <motion.span
                      key={likes[game.id]}
                      initial={{ scale: 1.5, color: COLORS.primary.red }}
                      animate={{ scale: 1, color: COLORS.primary.red }}
                      transition={{ duration: 0.3 }}
                      className="text-xs md:text-sm font-semibold"
                    >
                      {likes[game.id]}
                    </motion.span>
                    <span
                      className="text-xs"
                      style={{ color: COLORS.primary.mediumGray }}
                    >
                      Likes
                    </span>
                  </div>

                  <motion.button
                    onClick={() => navigate(`/games?selected=${game.id}`)}
                    whileHover={{ scale: 1.05, boxShadow: '0 4px 20px rgba(229, 57, 53, 0.4)' }}
                    whileTap={{ scale: 0.95 }}
                    style={{ backgroundColor: COLORS.primary.red }}
                    className="w-full text-white py-2 rounded-lg font-semibold transition-all text-sm flex items-center justify-center gap-2 group"
                  >
                    Learn More
                    <motion.div
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowForward style={{ fontSize: '16px' }} />
                    </motion.div>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

// ==================== STATISTICS SECTION ====================
const StatisticsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const stats = [
    {
      icon: EmojiEvents,
      value: 1,
      label: 'the #1 Arcade Experience at  Events And more ',
      color: '#E53935',
    },
    {
      icon: Celebration,
      value: 300,
      label: 'Events since 2024"',
      color: '#F77F00',
    },
    {
      icon: Favorite,
      value: 5,
      label: 'Average Rating',
      color: '#E53935',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      ref={ref}
      className="w-full py-12 sm:py-16 md:py-20"
      style={{
        background: `linear-gradient(135deg, ${COLORS.primary.navy} 0%, #2a3f5f 100%)`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-row md:grid md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 overflow-x-auto md:overflow-visible px-2 sm:px-4 md:px-0 py-4 md:py-0"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex flex-col items-center text-center min-w-[200px] sm:min-w-[220px] md:min-w-0"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="mb-4 sm:mb-6 p-4 rounded-2xl backdrop-blur-sm"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <Icon
                    style={{
                      fontSize: '48px',
                      color: stat.color,
                    }}
                    className="sm:text-[56px]"
                  />
                </motion.div>

                <div className="mb-2">
                  <h3 className="font-poppins font-black text-3xl sm:text-4xl text-white">
                    {inView && (
                      <CountUp
                        isCounting={inView}
                        start={0}
                        end={stat.value}
                        duration={2}
                        decimals={stat.value === 4.9 ? 1 : 0}
                      />
                    )}
                    {stat.value === 4.9 && inView ? '' : stat.value === 4.9 ? '4.9' : ''}
                    {stat.value !== 4.9 && '+'}
                  </h3>
                </div>

                <p className="font-inter font-light text-base sm:text-lg md:text-xl text-gray-200 px-2">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

// ==================== GALLERY CAROUSEL ====================
const GalleryCarousel = () => {
  const scrollContainerRef = React.useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const galleryItems = [
    {
      id: 1,
      image: '/assets/images/events/event1.jpg',
      name: 'Christmas Festival',
      location: 'Lebanon',
      date: 'December 2025',
    },
    {
      id: 2,
      image: '/assets/images/events/event2.jpg',
      name: 'Safadi Center Event',
      location: 'Safadi Center',
      date: 'November 2025',
    },
    {
      id: 3,
      image: '/assets/images/events/event3.jpg',
      name: 'Summer Festival - Eid',
      location: 'Lebanon',
      date: 'Eid Al-Fitr 2025',
    },
    {
      id: 4,
      image: '/assets/images/events/event4.jpg',
      name: 'New Year Festival',
      location: 'Lebanon',
      date: 'December 2025',
    },
    {
      id: 5,
      image: '/assets/images/events/event5.jpg',
      name: 'Summer Festival',
      location: 'Lebanon',
      date: 'May 2025',
    },
    {
      id: 6,
      image: '/assets/images/events/event6.jpg',
      name: 'Summer Festival',
      location: 'Lebanon',
      date: 'June 2025',
    },
  ];

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      if (direction === 'left') {
        scrollContainerRef.current.scrollBy({
          left: -scrollAmount,
          behavior: 'smooth',
        });
        setCurrentIndex(Math.max(0, currentIndex - 1));
      } else {
        scrollContainerRef.current.scrollBy({
          left: scrollAmount,
          behavior: 'smooth',
        });
        setCurrentIndex(Math.min(galleryItems.length - 1, currentIndex + 1));
      }
    }
  };

  return (
    <section
      className="w-full py-16 md:py-20"
      style={{ backgroundColor: COLORS.primary.lightGray }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <PhotoCamera
            style={{
              fontSize: '32px',
              color: COLORS.primary.red,
            }}
          />
          <h2
            className="font-poppins font-bold text-3xl md:text-4xl"
            style={{ color: COLORS.primary.darkGray }}
          >
            From Our Events
          </h2>
        </motion.div>

        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scroll-smooth pb-4"
            style={{
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {galleryItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex-shrink-0 w-80 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                style={{
                  backgroundColor: COLORS.primary.white,
                }}
              >
                <div className="relative w-full bg-gray-200 overflow-hidden" style={{ paddingBottom: '75%' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-4">
                  <h3
                    className="font-poppins font-bold text-base mb-3"
                    style={{ color: COLORS.primary.darkGray }}
                  >
                    {item.name}
                  </h3>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <LocationOn
                        style={{
                          fontSize: '18px',
                          color: COLORS.primary.red,
                        }}
                      />
                      <span
                        className="text-sm"
                        style={{ color: COLORS.primary.mediumGray }}
                      >
                        {item.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DateRange
                        style={{
                          fontSize: '18px',
                          color: COLORS.primary.red,
                        }}
                      />
                      <span
                        className="text-sm"
                        style={{ color: COLORS.primary.mediumGray }}
                      >
                        {item.date}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/3 -translate-y-1/2 -translate-x-4 md:-translate-x-6 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all z-10 hidden md:flex items-center justify-center"
            style={{
              backgroundColor: COLORS.primary.white,
              color: COLORS.primary.navy,
            }}
          >
            <ChevronLeft style={{ fontSize: '28px' }} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/3 -translate-y-1/2 translate-x-4 md:translate-x-6 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all z-10 hidden md:flex items-center justify-center"
            style={{
              backgroundColor: COLORS.primary.white,
              color: COLORS.primary.navy,
            }}
          >
            <ChevronRight style={{ fontSize: '28px' }} />
          </button>
        </div>

        <div className="md:hidden text-center mt-4">
          <p
            className="text-sm"
            style={{ color: COLORS.primary.mediumGray }}
          >
            Swipe left to see more events
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6">
          {galleryItems.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                if (scrollContainerRef.current) {
                  const scrollAmount = 320 * index;
                  scrollContainerRef.current.scrollTo({
                    left: scrollAmount,
                    behavior: 'smooth',
                  });
                }
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`rounded-full transition-all ${index === currentIndex ? 'w-3 h-3' : 'w-2 h-2'
                }`}
              style={{
                backgroundColor: index === currentIndex ? COLORS.primary.red : COLORS.primary.borderGray,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

// ==================== TESTIMONIALS SECTION ====================
const TestimonialsSection = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const handleFaqToggle = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <section
      className="w-full py-20"
      style={{ backgroundColor: COLORS.primary.white }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="font-poppins font-bold text-3xl md:text-4xl mb-8"
              style={{ color: COLORS.primary.darkGray }}
            >
              What Our Clients Say
            </h2>

            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-xl mb-6"
              style={{
                backgroundColor: '#F9F9F9',
                border: `1px solid ${COLORS.primary.borderGray}`,
              }}
            >
              <div
                className="text-6xl font-poppins font-black mb-4 opacity-20"
                style={{ color: COLORS.primary.red }}
              >
                "
              </div>

              <p
                className="font-inter text-lg mb-6 leading-relaxed"
                style={{ color: COLORS.primary.darkGray }}
              >
                {TESTIMONIALS[currentTestimonial].text}
              </p>

              <div className="flex gap-1 mb-4">
                {[...Array(TESTIMONIALS[currentTestimonial].rating)].map((_, i) => (
                  <Star
                    key={i}
                    style={{
                      fontSize: '20px',
                      color: COLORS.primary.yellow,
                    }}
                  />
                ))}
              </div>

              <p
                className="font-poppins font-semibold"
                style={{ color: COLORS.primary.darkGray }}
              >
                - {TESTIMONIALS[currentTestimonial].author}
              </p>
              <p
                className="text-sm"
                style={{ color: COLORS.primary.mediumGray }}
              >
                {TESTIMONIALS[currentTestimonial].role}
              </p>
            </motion.div>

            <div className="flex gap-3 justify-center">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className="w-3 h-3 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor:
                      index === currentTestimonial
                        ? COLORS.primary.red
                        : COLORS.primary.borderGray,
                  }}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="font-poppins font-bold text-3xl md:text-4xl mb-8"
              style={{ color: COLORS.primary.darkGray }}
            >
              Common Questions
            </h2>

            <div className="space-y-3">
              {FAQ_ITEMS.map((item) => (
                <motion.div
                  key={item.id}
                  className="border rounded-lg overflow-hidden"
                  style={{ borderColor: COLORS.primary.borderGray }}
                >
                  <button
                    onClick={() => handleFaqToggle(item.id)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                    style={{
                      backgroundColor:
                        expandedFaq === item.id ? '#F5F5F5' : 'transparent',
                    }}
                  >
                    <span
                      className="font-poppins font-semibold text-left"
                      style={{ color: COLORS.primary.darkGray }}
                    >
                      {item.question}
                    </span>
                    <motion.div
                      animate={{
                        rotate: expandedFaq === item.id ? 180 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ExpandMore
                        style={{
                          color: COLORS.primary.red,
                          fontSize: '24px',
                        }}
                      />
                    </motion.div>
                  </button>

                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: expandedFaq === item.id ? 'auto' : 0,
                      opacity: expandedFaq === item.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div
                      className="px-6 py-4 border-t"
                      style={{ borderColor: COLORS.primary.borderGray }}
                    >
                      <p
                        className="font-inter text-sm leading-relaxed"
                        style={{ color: COLORS.primary.mediumGray }}
                      >
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ==================== FINAL CTA ====================
const FinalCTA = () => {
  const contactMethods = [
    {
      icon: Phone,
      label: 'Call Us',
      value: CONTACT_INFO.phone,
    },
    {
      icon: WhatsApp,
      label: 'WhatsApp',
      value: CONTACT_INFO.whatsapp,
    },
    {
      icon: Email,
      label: 'Email',
      value: CONTACT_INFO.email,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      className="w-full py-20"
      style={{ backgroundColor: COLORS.primary.red }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            variants={itemVariants}
            className="font-poppins font-black text-4xl md:text-5xl text-white mb-6"
          >
            Ready to Bring the Joy?
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="font-inter font-light text-lg md:text-xl text-white mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Contact us today to discuss your event or machine purchase.
          </motion.p>

          <motion.div
            variants={containerVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap"
          >
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              const handleClick = () => {
                if (method.label === 'Call Us') {
                  window.location.href = `tel:${method.value}`;
                } else if (method.label === 'WhatsApp') {
                  window.open(`https://wa.me/${method.value.replace(/\+/g, '')}`, '_blank');
                } else if (method.label === 'Email') {
                  window.location.href = `mailto:${method.value}`;
                }
              };

              return (
                <motion.button
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClick}
                  style={{
                    backgroundColor: COLORS.primary.white,
                    color: COLORS.primary.red,
                  }}
                  className="px-8 py-4 rounded-lg font-poppins font-bold text-base flex items-center gap-2 hover:bg-gray-100 transition-all duration-300 cursor-pointer"
                >
                  <Icon style={{ fontSize: '20px' }} />
                  {method.label}
                </motion.button>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ==================== LOADING SPINNER ====================
const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
  </div>
);

// ==================== MAIN HOME PAGE ====================
const Home = () => {
  const [animationComplete, setAnimationComplete] = useState(false);

  return (
    <Layout>
      {!animationComplete && (
        <OpeningAnimation onComplete={() => setAnimationComplete(true)} />
      )}
      <HeroSection />
      <Suspense fallback={<LoadingSpinner />}>
        <QuickStatsLine />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <FeaturedGames />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <StatisticsSection />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <GalleryCarousel />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <TestimonialsSection />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <FinalCTA />
      </Suspense>
    </Layout>
  );
};

export default Home;
