/**
 * Image Optimization Utilities
 * Handles WebP format with fallback support
 */

/**
 * Get optimized image URL with WebP support
 * @param {string} imagePath - Original image path
 * @returns {object} Object with webp and fallback paths
 */
export const getOptimizedImagePath = (imagePath) => {
  if (!imagePath) return null;
  
  // If it's already a remote placeholder, return as is
  if (imagePath.includes('via.placeholder.com')) {
    return imagePath;
  }

  // Convert local paths to WebP
  const basePath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '');
  
  return {
    webp: `${basePath}.webp`,
    fallback: imagePath,
  };
};

/**
 * Responsive Image Component Helper
 * Returns srcSet for different screen sizes
 */
export const getResponsiveImageSrcSet = (imagePath) => {
  if (!imagePath) return '';
  
  const basePath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '');
  
  return {
    small: `${basePath}-small.webp 320w, ${imagePath} 320w`,
    medium: `${basePath}-medium.webp 768w, ${imagePath} 768w`,
    large: `${basePath}-large.webp 1920w, ${imagePath} 1920w`,
  };
};

/**
 * Lazy load image with intersection observer
 */
export const useLazyLoadImage = (ref) => {
  if (typeof window === 'undefined') return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });

  if (ref?.current) {
    observer.observe(ref.current);
  }

  return observer;
};
