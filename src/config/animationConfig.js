// Animation configuration constants and presets using anime.js

export const ANIMATION_CONFIG = {
  // Timing
  DURATION_SHORT: 300,
  DURATION_MEDIUM: 600,
  DURATION_LONG: 1000,

  // Easing presets (anime.js compatible)
  EASING: {
    EASE_IN: 'easeInOutQuad',
    EASE_OUT: 'easeOutQuad',
    EASE_IN_OUT: 'easeInOutQuad',
    EASE_OUT_CUBIC: 'easeOutCubic',
    EASE_OUT_BOUNCE: 'easeOutBounce',
    EASE_OUT_ELASTIC: 'easeOutElastic',
    LINEAR: 'linear',
  },

  // Scroll animation thresholds
  SCROLL: {
    PARALLAX_INTENSITY: 0.5, // Hero image movement intensity (0-1)
    FADE_IN_THRESHOLD: 0.2, // When to start fade-in (0-1, from bottom of viewport)
    SLIDE_UP_DISTANCE: 50, // Pixels to slide up during entry animation
  },

  // Section-specific delays (stagger effect)
  STAGGER: {
    SKILL_ITEM: 50, // ms between each skill item appearing
    PROJECT_CARD: 100, // ms between each project card
    EXPERIENCE_ITEM: 75, // ms between experience items
  },

  // Cursor animation
  CURSOR: {
    FOLLOW_SPEED: 0.3, // How quickly cursor follows mouse (0-1)
    SIZE_NORMAL: 30, // Normal cursor size (px)
    SIZE_HOVER: 50, // Size when hovering interactive elements
  },

  // Hero section
  HERO: {
    MOVE_RIGHT_DISTANCE: 100, // pixels to move right on scroll
    PARALLAX_FACTOR: 0.5, // Parallax intensity
  },
};

// Helper function to convert anime.js timing to milliseconds
export const getAnimationDuration = (preset) => {
  const durations = {
    short: ANIMATION_CONFIG.DURATION_SHORT,
    medium: ANIMATION_CONFIG.DURATION_MEDIUM,
    long: ANIMATION_CONFIG.DURATION_LONG,
  };
  return durations[preset] || ANIMATION_CONFIG.DURATION_MEDIUM;
};

// Helper to create staggered animation delays
export const createStaggerDelay = (index, delayMs) => {
  return index * delayMs;
};
