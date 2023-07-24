module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        bugfixes: true, // will be enabled by default in Babel 8
        modules: false,
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { version: 'legacy' }],
    '@babel/plugin-transform-runtime',
    require.resolve('react-refresh/babel'),
  ],
};
