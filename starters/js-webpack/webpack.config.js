const path = require('path');
const webpack = require('webpack');

// Constant with our paths
const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  SRC: path.resolve(__dirname, 'src'),
  JS: path.resolve(__dirname, 'src/js'),
};

const mainEntry = path.join(paths.JS, 'index.js');
const polyfillsEntry = path.join(paths.SRC, 'polyfills.js');

// Webpack configuration
module.exports = (env, args) => {
  const isProduction = args.mode === 'production';

  const config = {
    devtool: isProduction ? 'source-map' : '#cheap-module-eval-source-map',
    entry: [polyfillsEntry, mainEntry],
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
    },
    output: {
      // Add /* filename */ comments to generated require()s in the output.
      pathinfo: true,
      // This does not produce a real file. It's just the virtual path that is
      // served by WebpackDevServer in development. This is the JS bundle
      // containing code from all our entry points, and the Webpack runtime.
      filename: 'static/js/bundle.js',
      // There are also additional JS chunk files if you use code splitting.
      chunkFilename: 'static/js/[name].chunk.js',
      // This is the URL that app is served from. We use "/" in development.
      publicPath: '/',
    },
    optimization: {
      // Automatically split vendor and commons
      // https://twitter.com/wSokra/status/969633336732905474
      // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
      splitChunks: {
        chunks: 'all',
        name: 'vendors',
      },
      // Keep the runtime chunk separated to enable long term caching
      // https://twitter.com/wSokra/status/969679223278505985
      runtimeChunk: true,
    },
    plugins: [],
  };

  if (!isProduction) {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());

    config.devServer = {
      // Enable gzip compression of generated files.
      compress: true,
      // Enable hot reloading server. It will provide /sockjs-node/ endpoint
      // for the WebpackDevServer client so it can learn when the files were
      // updated. The WebpackDevServer client is included as an entry point
      // in the Webpack development configuration. Note that only changes
      // to CSS are currently hot reloaded. JS changes will refresh the browser.
      hot: true,
      // WebpackDevServer is noisy by default so we emit custom message instead
      // by listening to the compiler events with `compiler.hooks[...].tap` calls above.
      quiet: true,
      // Enable/disable HTTPS
      https: false,
      // WebPackDev server serves physical files from
      contentBase: './public',
      path: paths.DIST,
      // It is important to tell WebpackDevServer to use the same "root" path
      // as we specified in the config. In development, we always serve from /.
      publicPath: '/',
      // By default files from `contentBase` will not trigger a page reload.
      watchContentBase: true,
    };
  }

  return config;
};
