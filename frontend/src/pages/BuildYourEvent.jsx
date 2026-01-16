import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/layout/Layout';
import { COLORS } from '../utils/constants';
import { gamesAPI } from '../services/api';
import {
  Games,
  SportsEsports,
  SquareFoot,
  ElectricBolt,
  Groups,
  TrendingUp,
  Psychology,
  Add,
  Remove,
  CheckCircle,
  School,
  Apartment,
  Celebration,
  Public,
  AutoAwesome,
  Verified,
} from '@mui/icons-material';

// Event types
const EVENT_TYPES = [
  { id: 1, name: 'School Festival', icon: School, suggestedPackage: 3 },
  { id: 2, name: 'University Event', icon: Apartment, suggestedPackage: 2 },
  { id: 3, name: 'Private Party', icon: Celebration, suggestedPackage: 1 },
  { id: 4, name: 'Public Festival', icon: Public, suggestedPackage: 2 },
];

const BuildYourEvent = () => {
  const [selectedGames, setSelectedGames] = useState([]);
  const [gamesDatabase, setGamesDatabase] = useState([]);
  const [calculations, setCalculations] = useState({
    count: 0,
    space: 0,
    power: 0,
    capacity: { min: 0, max: 0 },
    cost: { min: 0, max: 0 },
    excitement: 0,
  });
  const [selectedEventType, setSelectedEventType] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);

  // Fetch games from API
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await gamesAPI.getAll();
        // Transform API data to match expected format
        const transformedGames = data.map(game => ({
          id: game.id,
          name: game.name,
          icon: SportsEsports, // Default icon
          space: parseInt(game.spaceRequired) || 5,
          power: 2,
          capacity: game.capacity,
          price: parseFloat(game.price) || 0,
          excitement: 8,
          usesCoins: game.usesCoins
        }));
        setGamesDatabase(transformedGames);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, []);

  // Calculate metrics when games selection changes
  useEffect(() => {
    if (selectedGames.length === 0 || gamesDatabase.length === 0) {
      setCalculations({
        count: 0,
        space: 0,
        power: 0,
        capacity: { min: 0, max: 0 },
        cost: { min: 0, max: 0 },
        excitement: 0,
      });
      return;
    }

    const games = gamesDatabase.filter(g => selectedGames.includes(g.id));
    const totalSpace = games.reduce((sum, g) => sum + g.space, 0);
    const totalPower = games.reduce((sum, g) => sum + g.power, 0);
    const avgCapacity = Math.round(games.reduce((sum, g) => sum + g.capacity, 0) / games.length);
    const totalCostMin = games.reduce((sum, g) => sum + g.price, 0);
    const totalCostMax = totalCostMin; // Total equals subtotal (setup is free)
    const avgExcitement = Math.round(games.reduce((sum, g) => sum + g.excitement, 0) / games.length);

    setCalculations({
      count: games.length,
      space: totalSpace,
      power: totalPower,
      capacity: { min: avgCapacity - 20, max: avgCapacity + 30 },
      cost: { min: totalCostMin, max: totalCostMax },
      excitement: avgExcitement,
    });
  }, [selectedGames, gamesDatabase]);

  const toggleGame = (gameId) => {
    setSelectedGames(prev => 
      prev.includes(gameId) 
        ? prev.filter(id => id !== gameId)
        : [...prev, gameId]
    );
  };

  const selectEventType = (eventType) => {
    setSelectedEventType(eventType);
    setShowQuiz(false);
  };

  const getExcitementBar = () => {
    const level = calculations.excitement;
    const bars = Math.round((level / 10) * 10);
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-400">Calm</span>
        <div className="flex gap-0.5">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: i < bars ? 1 : 0.3 }}
              transition={{ delay: i * 0.05 }}
              className={`w-3 h-6 rounded ${
                i < bars 
                  ? i < 4 ? 'bg-green-500' : i < 7 ? 'bg-yellow-500' : 'bg-red-500'
                  : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-400">Exciting</span>
      </div>
    );
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white py-20">
        {/* Hero Section */}
        <div className="container mx-auto px-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              className="inline-block mb-6"
            >
              <AutoAwesome className="text-6xl" style={{ color: COLORS.primary.yellow }} />
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 bg-clip-text text-transparent">
              <Celebration className="inline text-5xl" /> Build Your Perfect Event <Celebration className="inline text-5xl" />
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed font-semibold">
              Welcome to the ultimate event builder! Whether you're organizing a school festival, university event, private party, or public gathering – our AI tool helps you design a complete and fun arcade experience.
            </p>
          </motion.div>
        </div>

        {/* Event Type Quiz */}
        <div className="container mx-auto px-4 mb-16">
          <motion.button
            whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowQuiz(!showQuiz)}
            className="mx-auto block px-8 py-4 rounded-2xl font-bold text-lg shadow-xl"
            style={{ 
              background: `linear-gradient(135deg, ${COLORS.primary.red}, ${COLORS.primary.yellow})`,
              color: COLORS.primary.white 
            }}
          >
            <Psychology className="inline mr-2" />
            Not Sure Where to Start? Take Event Quiz!
          </motion.button>

          <AnimatePresence>
            {showQuiz && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {EVENT_TYPES.map((eventType) => (
                  <motion.div
                    key={eventType.id}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => selectEventType(eventType)}
                    className={`p-6 rounded-2xl cursor-pointer border-4 transition-all shadow-lg ${
                      selectedEventType?.id === eventType.id
                        ? 'border-red-500 bg-white'
                        : 'border-gray-200 bg-white hover:border-red-400'
                    }`}
                  >
                    <eventType.icon className="text-5xl mb-4" style={{ color: COLORS.primary.red }} />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{eventType.name}</h3>
                    {selectedEventType?.id === eventType.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="mt-3 text-green-600 flex items-center gap-2 font-bold"
                      >
                        <Verified /> <AutoAwesome className="text-lg" /> AI Package Loaded!
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Step 1: Choose Games */}
        <div className="container mx-auto px-4 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              <Games className="inline text-4xl mr-3" style={{ color: COLORS.primary.red }} />
              Step 1: Choose Your Games
            </h2>
            <p className="text-gray-600 font-semibold">Click to add or remove games from your event</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {gamesDatabase.map((game, index) => {
              const isSelected = selectedGames.includes(game.id);
              const Icon = game.icon;
              
              return (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleGame(game.id)}
                  className={`relative p-6 rounded-2xl cursor-pointer border-2 transition-all shadow-lg ${
                    isSelected
                      ? 'border-red-500 bg-white'
                      : 'border-gray-200 bg-white hover:border-red-400 hover:shadow-xl'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="absolute top-3 right-3 bg-green-500 rounded-full p-1"
                    >
                      <CheckCircle className="text-white text-xl" />
                    </motion.div>
                  )}

                  <Icon className="text-5xl mb-3" style={{ color: COLORS.primary.red }} />
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{game.name}</h3>
                  
                  {game.usesCoins && (
                    <span className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-800 px-3 py-1 rounded-full text-xs font-bold mb-2">
                      🪙 Coin-Based
                    </span>
                  )}

                  <div className="space-y-1 text-sm text-gray-700 font-semibold">
                    <div className="flex justify-between">
                      <span>Space:</span>
                      <span>{game.space}m²</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Capacity:</span>
                      <span>{game.capacity} guests</span>
                    </div>
                    <div className="flex justify-between font-bold" style={{ color: COLORS.primary.yellow }}>
                      <span>Rental/Day:</span>
                      <span>${game.price}</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="mt-4 w-full py-2 rounded-lg font-bold flex items-center justify-center gap-2"
                    style={{
                      background: isSelected 
                        ? `linear-gradient(135deg, ${COLORS.primary.red}, #dc2626)`
                        : `linear-gradient(135deg, ${COLORS.primary.navy}, ${COLORS.primary.red})`,
                      color: COLORS.primary.white
                    }}
                  >
                    {isSelected ? <Remove /> : <Add />}
                    {isSelected ? 'Remove' : 'Add Game'}
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Step 2: Live Calculator */}
        {selectedGames.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="container mx-auto px-4 mb-16"
          >
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center" style={{ color: COLORS.primary.navy }}>
                <TrendingUp className="inline text-4xl mr-3" style={{ color: COLORS.primary.red }} />
                Step 2: Live Calculator
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <motion.div
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-md"
                >
                  <Games className="text-4xl mb-3" style={{ color: COLORS.primary.red }} />
                  <div className="text-sm mb-1 font-bold" style={{ color: COLORS.primary.navy }}>Games Selected</div>
                  <div className="text-3xl font-bold" style={{ color: COLORS.primary.navy }}>{calculations.count}/12</div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-md"
                >
                  <SquareFoot className="text-4xl mb-3" style={{ color: COLORS.primary.red }} />
                  <div className="text-sm mb-1 font-bold" style={{ color: COLORS.primary.navy }}>Required Space</div>
                  <div className="text-3xl font-bold" style={{ color: COLORS.primary.navy }}>{calculations.space}m²</div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-md"
                >
                  <ElectricBolt className="text-4xl mb-3" style={{ color: COLORS.primary.red }} />
                  <div className="text-sm mb-1 font-bold" style={{ color: COLORS.primary.navy }}>Power Required</div>
                  <div className="text-3xl font-bold" style={{ color: COLORS.primary.navy }}>{calculations.power}A</div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-md"
                >
                  <Groups className="text-4xl mb-3" style={{ color: COLORS.primary.red }} />
                  <div className="text-sm mb-1 font-bold" style={{ color: COLORS.primary.navy }}>Guest Capacity</div>
                  <div className="text-3xl font-bold" style={{ color: COLORS.primary.navy }}>
                    {calculations.capacity.min}–{calculations.capacity.max}
                  </div>
                </motion.div>


                <motion.div
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-md"
                >
                  <Celebration className="text-4xl mb-3" style={{ color: COLORS.primary.yellow }} />
                  <div className="text-sm mb-3 font-bold" style={{ color: COLORS.primary.navy }}>Event Atmosphere</div>
                  {getExcitementBar()}
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Invoice/Quote */}
        {selectedGames.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="container mx-auto px-4 mb-16"
          >
            <div className="max-w-2xl mx-auto bg-white rounded-2xl p-10 border-2 border-gray-200 shadow-2xl">
              {/* Invoice Header */}
              <div className="text-center mb-8 pb-6 border-b-2 border-gray-200">
                <h2 className="text-3xl font-bold" style={{ color: COLORS.primary.navy }}>
                  Quote Summary
                </h2>
                <p className="text-gray-500 mt-2 font-semibold">Event Configuration Details</p>
              </div>

              {/* Selected Games Summary */}
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-4" style={{ color: COLORS.primary.navy }}>
                  Selected Games ({selectedGames.length})
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedGames.map((gameId) => {
                    const game = gamesDatabase.find(g => g.id === gameId);
                    return (
                      <motion.div
                        key={gameId}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <CheckCircle className="text-green-500" />
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-800">{game.name}</p>
                          <p className="text-xs text-gray-500">${game.price}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8 border-2 border-gray-200">
                <h3 className="text-lg font-bold mb-4" style={{ color: COLORS.primary.navy }}>
                  Cost Breakdown
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">Subtotal ({calculations.count} games)</span>
                    <span className="text-lg font-bold" style={{ color: COLORS.primary.red }}>${calculations.cost.min}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">Setup</span>
                    <span className="text-lg font-bold text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">Space Required</span>
                    <span className="text-lg font-bold text-gray-600">{calculations.space}m²</span>
                  </div>
                  <hr className="my-2 border-gray-300" />
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold" style={{ color: COLORS.primary.navy }}>Total Estimated</span>
                    <span
                      className="text-3xl font-bold"
                      style={{ color: COLORS.primary.red }}
                    >
                      ${calculations.cost.max}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">*Final price may vary based on event specifics</p>
                </div>
              </div>

              {/* Call to Confirm */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-r rounded-xl p-8 text-center"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.primary.red}20, ${COLORS.primary.yellow}20)`,
                  border: `2px solid ${COLORS.primary.red}`,
                }}
              >
                <h3 className="text-2xl font-bold mb-3" style={{ color: COLORS.primary.navy }}>
                  Ready to Book Your Event?
                </h3>
                <p className="text-gray-700 mb-6 font-semibold">
                  Contact us via WhatsApp with your event details. We'll respond within 2 hours!
                </p>

                <div className="space-y-4">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={`https://wa.me/96170420110?text=${encodeURIComponent(
                      `🎮 *Event Booking Request*\n\n` +
                      `📋 *Selected Games (${calculations.count}):*\n${selectedGames.map(id => `• ${gamesDatabase.find(g => g.id === id)?.name}`).join('\n')}\n\n` +
                      `💰 *Estimated Total:* $${calculations.cost.min.toFixed(2)} (Rental per day)\n` +
                      `📐 *Space Required:* ${calculations.space}m²\n` +
                      `⚡ *Power Required:* ${calculations.power}A\n` +
                      `🔧 *Setup:* Free\n\n` +
                      `Hi! I'm interested in renting these arcade games for my event. Please contact me to confirm availability and final pricing.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-4 rounded-xl font-bold text-lg transition-all text-white text-center shadow-lg hover:shadow-xl"
                    style={{
                      background: `linear-gradient(135deg, #25D366, #128C7E)`,
                    }}
                  >
                    📱 Confirm via WhatsApp
                  </motion.a>

                  <p className="text-sm text-gray-600 font-medium">
                    You can also add your event date, location, and any special requirements in the message!
                  </p>
                </div>

                <p className="text-xs text-gray-500 mt-4 font-semibold">
                  Response within 2 hours • Available 9 AM - 9 PM
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}

      </div>
    </Layout>
  );
};

export default BuildYourEvent;
