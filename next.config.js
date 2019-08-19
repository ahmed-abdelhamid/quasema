const withFonts = require('next-fonts');

module.exports = withFonts({
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    };

    return config;
  },
  target: 'serverless',
  env: {
    API_URL: process.env.API_URL || 'http://192.168.1.105:7070'
  }
});
