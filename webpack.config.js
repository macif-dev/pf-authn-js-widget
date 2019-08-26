const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devServer = require('./demo-server');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const PATHS = {
  dist: path.join(__dirname, 'dist'),
  node_modules: path.join(__dirname, 'node_modules'),
  src: path.join(__dirname, 'src')
};

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';

  return {
    devServer: {
      hot: true,
      before: function (app, server) {
        var options = {
          baseUrl: argv.baseurl
        }
        console.debug(options);
        devServer(app, server, options);
      },
      contentBase: [path.join(__dirname, 'dist')],
      compress: true,
      port: 8443,
      https: true
    },
    entry: ['whatwg-fetch', path.join(PATHS.src, 'index')],
    output: {
      path: PATHS.dist,
      filename: 'pf.authn-widget.js',
      library: 'PfAuthnWidget',
      publicPath: '/',
      sourceMapFilename: 'pf.authn-widget.map',
      libraryTarget: 'umd'
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.(handlebars|hbs)$/,
          loader: "handlebars-loader",
          options: {
            helperDirs: path.join(__dirname, 'helpers'),
            precompileOptions: {
              knownHelpersOnly: false,
            },
          },
          exclude: /node_modules/
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader'
          },
        },
        {
          test: /\.js$/,
          use: ["source-map-loader"],
          enforce: "pre"
        },
        {
          test: /\.(scss|css)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                sourceMap: isDevelopment,
                minimize: !isDevelopment
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: isDevelopment
              }
            }
          ]
        },
        {
          test: /\.svg$/,
          loader: 'svg-inline-loader'
        },
        {
          test: /\.(jpg|png|gif|svg)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: '[name].[ext]',
                outputPath: 'static/',
                useRelativePath: true,
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          handlebarsLoader: {}
        }
      }),
      new MiniCssExtractPlugin({
        filename: "[name]-styles.css",
        chunkFilename: "[id].css"
      }),
      // new BundleAnalyzerPlugin(),
    ]
  }
}

