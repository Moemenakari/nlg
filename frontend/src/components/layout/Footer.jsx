import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Phone,
  Email,
  LocationOn,
  Instagram,
  Facebook,
  WhatsApp,
} from '@mui/icons-material';
import { COLORS, CONTACT_INFO } from '../../utils/constants';

const Footer = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const socialIconVariants = {
    hover: {
      scale: 1.2,
      y: -5,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.9,
    },
  };

  const linkHoverVariants = {
    hover: {
      x: 8,
      color: '#FFC107',
      transition: { duration: 0.2 },
    },
  };

  return (
    <footer ref={ref} style={{ backgroundColor: COLORS.primary.navy }}>
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          {/* Column 1: Company Info */}
          <motion.div variants={itemVariants}>
            <motion.h3 
              className="text-white font-poppins font-bold text-lg mb-4"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              Next Level Games
            </motion.h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your premier destination for arcade machine sales, rentals, and event bookings in Lebanon.
            </p>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-white font-poppins font-bold text-base mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {['Home', 'About Us', 'Contact Us', 'Login'].map((link) => (
                <li key={link}>
                  <motion.a
                    href={link === 'Home' ? '/' : link === 'About Us' ? '/about-us' : link === 'Contact Us' ? '/contact-us' : '/login'}
                    className="text-gray-300 text-sm inline-block"
                    variants={linkHoverVariants}
                    whileHover="hover"
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Services */}
          <motion.div variants={itemVariants}>
            <h4 className="text-white font-poppins font-bold text-base mb-4">
              Services
            </h4>
            <ul className="space-y-2">
              {['Build Your Event', 'Games', 'About Us'].map((service) => (
                <li key={service}>
                  <motion.a
                    href={service === 'Build Your Event' ? '/build-your-event' : service === 'Games' ? '/games' : '/about-us'}
                    className="text-gray-300 text-sm inline-block"
                    variants={linkHoverVariants}
                    whileHover="hover"
                  >
                    {service}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact */}
          <motion.div variants={itemVariants}>
            <h4 className="text-white font-poppins font-bold text-base mb-4">
              Contact
            </h4>
            <div className="space-y-3">
              <motion.div 
                className="flex items-start gap-2"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <LocationOn
                  className="text-yellow-400 mt-1"
                  style={{ fontSize: '20px' }}
                />
                <p className="text-gray-300 text-sm">{CONTACT_INFO.address}</p>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Phone
                  className="text-yellow-400"
                  style={{ fontSize: '20px' }}
                />
                <p className="text-gray-300 text-sm">{CONTACT_INFO.phone}</p>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Email
                  className="text-yellow-400"
                  style={{ fontSize: '20px' }}
                />
                <p className="text-gray-300 text-sm">{CONTACT_INFO.email}</p>
              </motion.div>
            </div>

            {/* Social Links with bounce effect */}
            <div className="flex gap-4 mt-4">
              {[
                { Icon: Instagram, href: 'https://instagram.com/nextlevelgame_arcades', color: '#E1306C' },
                { Icon: Facebook, href: 'https://www.facebook.com/share/1D5uGhWqMg/?mibextid=wwXIfr', color: '#4267B2' },
                { Icon: WhatsApp, href: 'https://wa.me/96170420110', color: '#25D366' },
              ].map(({ Icon, href, color }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300"
                  variants={socialIconVariants}
                  whileHover="hover"
                  whileTap="tap"
                  style={{ 
                    display: 'inline-flex',
                    padding: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <Icon style={{ fontSize: '24px' }} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Footer with animated heart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="border-t py-6"
        style={{ borderColor: COLORS.primary.borderGray }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-300 text-sm">
            © 2026 Next Level Games | Made with{' '}
            <motion.span
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ 
                color: COLORS.primary.red, 
                display: 'inline-block',
              }}
            >
              ❤
            </motion.span>{' '}
            in Lebanon
          </p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
