/* eslint-disable no-process-env */
const webpack = require('webpack');

const config = {
  entry: './js/ireland.js',

  output: {
    filename: 'bundle.js',
    path: __dirname
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'FB_API_KEY': JSON.stringify(process.env.FB_API_KEY),
        'FB_AUTH_DOMAIN': JSON.stringify(process.env.FB_AUTH_DOMAIN),
        'FB_DATABASE_URL': JSON.stringify(process.env.FB_DATABASE_URL),
        'FB_PROJECT_ID': JSON.stringify(process.env.FB_PROJECT_ID),
        'FB_STORAGE_BUCKET': JSON.stringify(process.env.FB_STORAGE_BUCKET),
        'FB_MESSAGING_SENDER_ID':
          JSON.stringify(process.env.FB_MESSAGING_SENDER_ID),
      }
    })
  ]
};

module.exports = config;
