module.exports = {
  email: 'szhu62@jh.edu',

  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/ChesleaZ',
    },
  ],

  navLinks: [
    {
      name: 'About',
      url: '/about/',
    },
    {
      name: 'Research',
      url: '/research/',
    },
    {
      name: 'Publications',
      url: '/publications/',
    },
    {
      name: 'Contact',
      url: '/contact/',
    },
  ],

  colors: {
    green: '#2f6f73',
    navy: '#f7f4ee',
    darkNavy: '#ebe3d6',
  },

  srConfig: (delay = 200, viewFactor = 0.25) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
