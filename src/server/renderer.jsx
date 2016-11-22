import React from 'react'
import { renderToString } from 'react-dom/server'
import { ServerRouter, createServerRenderContext } from 'react-router'
import { Provider } from 'react-redux'
import path from 'path'
import fs from 'fs'

import configureStore from '../utils/configure-store'
import App from '../components/App/App'

// Minify this? or use preact to render a Html component
const html = fs.readFileSync(path.resolve(__dirname, './views/index.html'), 'utf8')

const renderHtml = (props) => Object
  .keys(props)
  .reduce((markup, prop) => markup.replace(`{{{ ${prop} }}}`, props[prop]), html)

const renderApp = (context, store, location) => renderToString(
  <ServerRouter
    location={ location }
    context={ context }
  >
    <Provider store={ store }>
      <App />
    </Provider>
  </ServerRouter>
)

// TODO - why does koa defy this eslint rule?
export default function* () { // eslint-disable-line require-yield
  const location = this.request.url

  const store = configureStore({})

  // first create a context for <ServerRouter>, it's where we keep the
  // results of rendering for the second pass if necessary
  const context = createServerRenderContext()

  // render the first time
  const markup = renderApp(context, store, location)

  // get the result
  const { redirect, missed } = context.getResult()

  // the result will tell you if it redirected, if so, we ignore
  // the markup and send a proper redirect.
  if (redirect) {
    this.response.status = 301 // TODO check this
    this.redirect(redirect.pathname)
    return
  }

  // the result will tell you if there were any misses, if so
  // we can send a 404 and then do a second render pass with
  // the context to clue the <Miss> components into rendering
  // this time (on the client they know from componentDidMount)
  if (missed) this.response.status = 404

  this.body = renderHtml({
    markup: missed ? renderApp(context, store, location) : markup,
    initialState: JSON.stringify(store.getState())
  })
}
