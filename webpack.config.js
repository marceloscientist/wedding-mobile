const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async (env, argv) => {
  const config = await createExpoWebpackConfigAsync(env, argv);
  
  // Garantir que devServer headers estão configurados
  config.devServer = config.devServer || {};
  config.devServer.headers = {
    'Content-Security-Policy': "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: http://localhost:* https://* ws: wss:;",
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  config.ignoreWarnings = config.ignoreWarnings || [];
  config.ignoreWarnings.push({
    module: /react-native-date-picker/,
  });

  return config;
};
