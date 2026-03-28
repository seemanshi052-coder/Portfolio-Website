// Wrapper to handle anime.js import compatibility
let anime;

try {
  // Try importing as default
  import('animejs').then((module) => {
    anime = module.default || module;
  });
} catch (e) {
  console.error('Failed to load anime.js:', e);
}

// Fallback object if anime doesn't load
const animeWrapper = new Proxy({}, {
  get: (target, prop) => {
    if (anime && typeof anime[prop] === 'function') {
      return anime[prop].bind(anime);
    }
    if (anime && anime[prop]) {
      return anime[prop];
    }
    // Return dummy function to prevent errors
    return () => ({ add: () => {}, pause: () => {} });
  },
  apply: (target) => {
    return () => ({ add: () => {}, pause: () => {} });
  },
});

export default animeWrapper;
