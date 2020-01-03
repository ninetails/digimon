module.exports = () => ({
  presets: [
    ['@babel/env', { targets: { node: 'current' } }],
    '@babel/typescript'
  ],
  plugins: [
    '@babel/proposal-numeric-separator',
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread'
  ]
})
