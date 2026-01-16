import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/layout/Layout';
import { COLORS } from '../utils/constants';
import { gamesAPI, getImageUrl } from '../services/api';
import {
  Games as GamesIcon,
  Close,
  Phone,
  WhatsApp,
  Info,
} from '@mui/icons-material';

const Games = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [gamesData, setGamesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  // Fetch games from API
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await gamesAPI.getAll();
        console.log('✅ Games fetched:', data);
        setGamesData(data);
      } catch (error) {
        console.error('❌ Error fetching games:', error);
        console.log('📝 Make sure backend is running on http://localhost:5000');
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  // Handle URL parameter to auto-select a game (from Home page Learn More)
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const selectedId = searchParams.get('selected');
    if (selectedId && gamesData.length > 0) {
      const game = gamesData.find(g => g.id === parseInt(selectedId));
      if (game) {
        setSelectedGame(game);
        // Clear the URL parameter after opening modal
        setSearchParams({});
      }
    }
  }, [searchParams, gamesData, setSearchParams]);

  // Default icon for games (category removed)
  const DefaultIcon = GamesIcon;

  // Coin-based filter options (as requested)
  const filterOptions = ['All', 'Coin-Based', 'Non-Coin'];

  // Filter games based on usesCoins field
  const filteredGames = activeFilter === 'All' 
    ? gamesData 
    : activeFilter === 'Coin-Based'
      ? gamesData.filter(game => game.usesCoins === 1 || game.usesCoins === true)
      : gamesData.filter(game => game.usesCoins === 0 || game.usesCoins === false || !game.usesCoins);

  return (
    <Layout>
      <div className="min-h-screen bg-white pt-20 pb-20">
        {/* Hero Section */}
        <div className="container mx-auto px-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1
              className="text-4xl md:text-6xl font-bold mb-6"
              style={{
                background: `linear-gradient(135deg, ${COLORS.primary.red}, ${COLORS.primary.yellow})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Our Games Collection
            </h1>
            <p className="text-xl text-gray-600 font-semibold">
              Discover our premium arcade games and entertainment equipment. Perfect for any event!
            </p>
          </motion.div>
        </div>

        {/* Coin-Based Filter */}
        <div className="container mx-auto px-4 mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {filterOptions.map((option) => (
              <motion.button
                key={option}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(option)}
                className={`px-6 py-3 rounded-xl font-bold transition-all ${
                  activeFilter === option
                    ? 'text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={{
                  background: activeFilter === option 
                    ? `linear-gradient(135deg, ${COLORS.primary.red}, ${COLORS.primary.yellow})`
                    : undefined,
                }}
              >
                {option}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Games Grid */}
        <div className="container mx-auto px-4">
          {loading ? (
            /* Shimmer Loading Skeleton */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden border-2 border-gray-200 shadow-lg">
                  <div className="h-64 animate-shimmer" />
                  <div className="p-6 space-y-4">
                    <div className="h-6 w-3/4 rounded animate-shimmer" />
                    <div className="h-4 w-full rounded animate-shimmer" />
                    <div className="h-4 w-2/3 rounded animate-shimmer" />
                    <div className="flex justify-between items-center pt-4">
                      <div className="h-8 w-20 rounded animate-shimmer" />
                      <div className="h-10 w-10 rounded-full animate-shimmer" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredGames.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <p className="text-xl text-gray-600">No games available yet. Admin can add games!</p>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredGames.map((game, index) => {
                return (
                  <motion.div
                    key={game.id}
                    layout
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ 
                      delay: index * 0.08,
                      duration: 0.4,
                      ease: 'easeOut'
                    }}
                    whileHover={{ 
                      y: -12, 
                      scale: 1.02,
                      boxShadow: '0 25px 50px rgba(229, 57, 53, 0.15)',
                      transition: { duration: 0.3 }
                    }}
                    onClick={() => setSelectedGame(game)}
                    className="bg-white rounded-2xl overflow-hidden border-2 border-gray-200 shadow-lg hover:border-red-300 transition-all cursor-pointer group"
                  >
                    {/* Game Image or Icon with enhanced hover */}
                    <div
                      className="h-64 flex items-center justify-center relative overflow-hidden"
                      style={game.image ? {
                        backgroundImage: `url(${getImageUrl(game.image)})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        borderBottom: `2px solid ${COLORS.primary.red}`,
                      } : {
                        background: `linear-gradient(135deg, ${COLORS.primary.red}30, ${COLORS.primary.yellow}30)`,
                        borderBottom: `2px solid ${COLORS.primary.red}`,
                      }}
                    >
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {!game.image && (
                        <motion.div
                          animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          <DefaultIcon className="text-6xl" style={{ color: COLORS.primary.red }} />
                        </motion.div>
                      )}
                      
                      {/* Quick view indicator */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-gray-800 opacity-0 group-hover:opacity-100 transition-all duration-300"
                      >
                        Click for details
                      </motion.div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2" style={{ color: COLORS.primary.navy }}>
                        {game.name}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 font-semibold">
                        {game.description}
                      </p>

                      {/* Quick Info */}
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">Capacity:</span>
                          <span className="font-bold text-gray-800">{game.capacity} guests</span>
                        </div>
                        {game.spaceRequired && (
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">Space:</span>
                            <span className="font-bold text-gray-800">{game.spaceRequired}</span>
                          </div>
                        )}
                      </div>

                      {/* Price and Button */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-500 font-semibold">Rental per Day</p>
                          <p className="text-2xl font-bold" style={{ color: COLORS.primary.red }}>
                            ${game.price}
                          </p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-3 rounded-full transition-all"
                          style={{ backgroundColor: COLORS.primary.navy }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedGame(game);
                          }}
                        >
                          <Info className="text-white" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              </motion.div>
            )}
        </div>
      </div>

      {/* Game Details Modal */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedGame(null)}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 pt-20"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Modal Header */}
              <div
                className="sticky top-0 flex items-center justify-between p-6 border-b-2 border-gray-200"
                style={{ backgroundColor: `${COLORS.primary.red}10` }}
              >
                <h2 className="text-2xl font-bold" style={{ color: COLORS.primary.navy }}>
                  Game Details
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedGame(null)}
                  className="p-2 rounded-full transition-all"
                  style={{ backgroundColor: COLORS.primary.red }}
                >
                  <Close className="text-white" />
                </motion.button>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                {/* Large Game Image */}
                {selectedGame.image && (
                  <div className="mb-8 overflow-hidden rounded-2xl border-2 border-gray-200 shadow-lg">
                    <motion.img
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      src={getImageUrl(selectedGame.image)}
                      alt={selectedGame.name}
                      className="w-full h-96 object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}

                {/* Icon and Title */}
                <div className="text-center mb-8">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-block"
                  >
                    <GamesIcon
                      className="text-8xl"
                      style={{ color: COLORS.primary.red }}
                    />
                  </motion.div>
                  <h3 className="text-4xl font-bold mt-6 mb-2" style={{ color: COLORS.primary.navy }}>
                    {selectedGame.name}
                  </h3>
                  {selectedGame.usesCoins && (
                    <span className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-800 px-4 py-1 rounded-full text-sm font-bold">
                      🪙 Coin-Operated
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-700 text-lg mb-8 leading-relaxed font-semibold">
                  {selectedGame.description}
                </p>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <p className="text-sm text-gray-600 mb-1 font-semibold">Rental/Day</p>
                    <p className="text-2xl font-bold" style={{ color: COLORS.primary.red }}>
                      ${selectedGame.price}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1 font-semibold">Capacity</p>
                    <p className="text-2xl font-bold" style={{ color: COLORS.primary.navy }}>
                      {selectedGame.capacity}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1 font-semibold">Space</p>
                    <p className="text-2xl font-bold" style={{ color: COLORS.primary.navy }}>
                      {selectedGame.spaceRequired}m²
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1 font-semibold">Power</p>
                    <p className="text-2xl font-bold" style={{ color: COLORS.primary.navy }}>
                      {selectedGame.powerRequired}kW
                    </p>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3 pt-6 border-t-2 border-gray-200">
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={`https://wa.me/96170420110?text=Hi! I'm interested in renting the ${selectedGame.name} for my event. Can you provide more details?`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-4 rounded-xl font-bold text-lg transition-all text-white text-center"
                    style={{ background: `linear-gradient(135deg, #25D366, #128C7E)` }}
                  >
                    <WhatsApp className="inline mr-2" />
                    Message on WhatsApp
                  </motion.a>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-xl font-bold text-lg transition-all text-white"
                    style={{
                      background: `linear-gradient(135deg, ${COLORS.primary.red}, ${COLORS.primary.yellow})`,
                    }}
                    onClick={() => window.location.href = 'tel:+1234567890'}
                  >
                    <Phone className="inline mr-2" />
                    Call Us Now
                  </motion.button>
                </div>

                <p className="text-xs text-gray-500 text-center mt-4 font-semibold">
                  Available for events • Fast delivery • Professional setup
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Games;
