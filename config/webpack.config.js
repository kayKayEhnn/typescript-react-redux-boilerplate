const { smart } = require('webpack-merge')

const { baseConfig } = require('./webpack.config.base')
const { modifications: modificationsDev } = require('./webpack.config.dev')
const { modifications: modificationsProd } = require('./webpack.config.prod')

module.exports = function config(env) {
  process.env.BABEL_ENV = env
  process.env.NODE_ENV = env

  const isProduction = env === 'production'

  let modifications = isProduction ? modificationsProd : modificationsDev
  let config = smart(baseConfig, modifications)

  return config
}
