module.exports = {
  presets: [
    [
      require('@babel/preset-env'),
      {
        useBuiltIns: 'entry',
        corejs: 3,
      },
    ],
    require('@babel/preset-react'),
    require('@babel/preset-typescript'),
    require('@emotion/babel-preset-css-prop'),
  ],
  plugins: [
    [require('@babel/plugin-proposal-class-properties'), { loose: true }],
    require('@babel/plugin-proposal-optional-chaining'),
    require('@babel/plugin-proposal-nullish-coalescing-operator'),
    require('@babel/plugin-proposal-numeric-separator'),
    require('babel-plugin-emotion'),
  ],
};
