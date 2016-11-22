import React from 'react'
import { Match, Miss } from 'react-router'

import Nav from '../Nav/Nav'
import Home from '../Home/Home'
import NotFound from '../NotFound/NotFound'
import Route from '../Route/Route'
import RedirectPage from '../RedirectPage/RedirectPage'

const styles = {}
// import styles from './App.css'
export default () => (
  <div className={ styles.app }>
    <Nav className={ styles.nav } />
    <main className={ styles.main }>
      <Match pattern="/" exactly component={ Home } />
      <Match pattern="/route" exactly component={ Route } />
      <Match pattern="/redirect" exactly component={ RedirectPage } />

      <Miss component={ NotFound } />
    </main>
  </div>
)
