module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@assets': './src/assets',
            '@configs': './src/configs',
            '@hooks': './src/hooks',
            '@constants': './src/constants',
            '@redux': './src/redux',
            '@components': './src/components',
            '@screens': './src/screens',
            '@core': './src/core',
            '@utils': './src/utils',
            '@service': './src/service',
            '@root': './src',
          },
        },
      ],
    ],
  };
};
