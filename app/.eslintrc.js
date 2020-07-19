module.exports = {
  extends: ['airbnb'],
  parser: 'babel-eslint',
  plugins: [
    'module-resolver',
    {
      root: '.',
      alias: {
        '_helpers/*': './helpers/*',
        _types: './types/index.ts',
        _typography: './theme/typography',
        _palette: './theme/palette',
        _metrics: './theme/metrics',
        _globals: './theme/globals',
        _zIndex: './theme/zIndex',
      },
    },
  ],
};
