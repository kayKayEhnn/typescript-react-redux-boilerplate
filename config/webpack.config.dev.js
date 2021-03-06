const path = require('path')
const openBrowser = require('react-dev-utils/openBrowser')
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware')
const evalSourceMapMiddleware = require('react-dev-utils/evalSourceMapMiddleware')
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware')

const {
  cssTest,
  scssTest,
  basePath,
  htmlPluginOptions,
} = require('./webpack.config.base')
const { HotModuleReplacementPlugin } = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerErrorOverlayPlugin = require('fork-ts-checker-error-overlay-webpack-plugin')
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin')

const PROXY_PORT = process.env.PORT || 9000

function getModifications(host, port) {
  return {
    mode: 'development',
    entry: ['react-dev-utils/webpackHotDevClient', './src/index.tsx'],
    output: {
      devtoolModuleFilenameTemplate(info) {
        return path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
      },
    },
    // Error overlay relies on this
    devtool: 'cheap-module-source-map',
    module: {
      rules: [
        {
          test: cssTest,
          // Replaces dts-css-modules-loader with style-loader
          use: ['style-loader', 'css-loader'],
        },
        {
          test: scssTest,
          use: [
            'style-loader',
            'dts-css-modules-loader?namedExport',
            {
              loader: 'css-loader',
              options: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          ],
        },
      ],
    },
    devServer: {
      host,
      port,
      contentBase: path.join(basePath, 'public'),
      watchContentBase: true,
      hot: true,
      // Prevents injecting of default webpackHotDevClient
      inline: false,
      historyApiFallback: {
        disableDotRule: true,
      },
      watchOptions: {
        ignored: /[/\\]node_modules[/\\]/,
      },
      stats: {
        assets: false,
        chunks: false,
        chunkGroups: false,
        chunkModules: false,
        chunkOrigins: false,
        entrypoints: false,
        hash: false,
        modules: false,
        version: false,
      },
      proxy: {
        '/api': {
          target: `http://localhost:${PROXY_PORT}`,
        },
      },
      before(app, server) {
        app.use(evalSourceMapMiddleware(server))
        app.use(errorOverlayMiddleware())
        app.use(noopServiceWorkerMiddleware())

        // Solves race condition problem of navigating before
        // development server has started listening for requests.
        setTimeout(() => openBrowser(`http://localhost:${port}/`), 1000)
      },
    },
    plugins: [
      new HotModuleReplacementPlugin(),
      new HTMLWebpackPlugin(htmlPluginOptions),
      new ForkTsCheckerErrorOverlayPlugin(ForkTsCheckerPlugin),
    ],
  }
}

module.exports = getModifications
