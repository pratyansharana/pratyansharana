const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Target ONLY the explicit transient autolinking folder, leaving node_modules intact
config.resolver.blocklistRE = [
  /node_modules\/\.expo-modules-autolinking-/,
];

module.exports = config;