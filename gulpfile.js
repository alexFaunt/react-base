const gulp = require('gulp')
const browserify = require('browserify')
const watchify = require('watchify')
const exorcist = require('exorcist')
const fs = require('fs')
const KarmaServer = require('karma').Server
const browserifyConfig = require('./browserify.config')
const path = require('path')

function handleErrors(e) {
  console.log(e)
  this.emit('end')
}

const start = () => {
  console.log('Creating bundle...')
  return Date.now()
}

const onComplete = (time) => console.log('Bundle created in', (Date.now() - time) / 1000, 'seconds.')

const build = (extractMaps, watch) => () => {
  const bundler = browserify(browserifyConfig)

  const bundle = () => {
    const time = start()
    const stream = bundler.bundle()
      .on('end', () => onComplete(time))
      .on('error', handleErrors)

    return (extractMaps ? stream.pipe(exorcist('./public/generated/bundle.map.js')) : stream)
      .pipe(fs.createWriteStream('./public/generated/bundle.js'))
  }

  if (watch) bundler.plugin(watchify).on('update', bundle)

  return bundle()
}

gulp.task('build', build(true, false))

gulp.task('default', build(false, true))

gulp.task('test', (done) => {
  new KarmaServer({
    configFile: path.resolve(__dirname, './karma.config.js'),
    singleRun: true
  }, done).start()
})
