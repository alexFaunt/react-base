module.exports = {
  entries: './src/index.jsx',
  extensions: ['.jsx', '.js'],
  debug: true,
  transform: [
    [
      'babelify', {
        presets: ['es2015', 'latest'],
        plugins: ['transform-object-rest-spread']
      }
    ]
  ]
}
