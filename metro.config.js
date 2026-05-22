const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/** Must match `npm start` and `npm run android` (--port 8082). */
const METRO_PORT = 8082;

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  server: {
    port: METRO_PORT,
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
