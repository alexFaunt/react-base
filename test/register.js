// require('mock-local-storage')
require('babel-register')({
  plugins: ['rewire']
})

const jsdom = require('jsdom')
// const nock = require('nock')
const HTML = '<html><body></body></html>'

global.document = jsdom.jsdom(HTML)
global.window = document.defaultView
global.Event = document.defaultView.Event
global.navigator = window.navigator

// nock.emitter.on('no match', (req) => {
//   console.log(`Request not mocked for path: ${req.path}`.red) // eslint-disable-line
//   process.exit(-1)
// })

process.on('unhandledRejection', (error) => console.log(error)) // eslint-disable-line
