import path from 'path'
import openBrowser from 'react-dev-utils/openBrowser'
import errorOverlayMiddleware from 'react-dev-utils/errorOverlayMiddleware'
import getCSSModuleLocalIdent from 'react-dev-utils/getCSSModuleLocalIdent'

import { cssTest } from './webpack.config.base'
import { Configuration, HotModuleReplacementPlugin } from 'webpack'

const PORT = 3000

export const modifications: Configuration = {
  mode: 'development',
  entry: {
    main: [
      'react-dev-utils/webpackHotDevClient',
      require.resolve('./hot-error-reload'),
      './src/index.tsx'
    ]
  },
  output: {
    devtoolModuleFilenameTemplate (info) {
      return path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
    }
  },
  devtool: 'cheap-module-source-map', // E-O-P relies on this
  module: {
    rules: [
      {
        test: cssTest,
        use: [
          'style-loader',
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              getLocalIdent: getCSSModuleLocalIdent
            }
          }
        ]
      }
    ]
  },
  devServer: {
    port: PORT,
    hot: true,
    historyApiFallback: true,
    watchOptions: {
      ignored: /[/\\]node_modules[/\\]/
    },
    proxy: {
      '/api': {
        target: 'http://localhost:9000'
      }
    },
    before (app) {
      app.use(errorOverlayMiddleware())
    },
    after () {
      openBrowser(`http://localhost:${PORT}/`)
    }
  },
  plugins: [
    new HotModuleReplacementPlugin()
  ]
}
