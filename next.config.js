const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([], {});

// Don't delete this console log, useful to see the commerce config in Vercel deployments
console.log('next.config.js', JSON.stringify(module.exports, null, 2))