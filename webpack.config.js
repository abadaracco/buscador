module.exports = options => {
  return {
    entry: [
      './src/index.js'
      ],
    output: {
      path: __dirname + '/public/js/',
      filename: 'bundle.js',
    },
    module: {
      loaders: [
        {
          test: /.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /.s?css$/,
          loaders: ['style-loader', 'css-loader', 'sass-loader'],
          include: __dirname + '/src',
        },
        {
          test: /\.(png|jpg)$/,
          loader: 'url-loader',
        }
      ]
    }
  }
}