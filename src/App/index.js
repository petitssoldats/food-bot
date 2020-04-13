import React, { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import routes from 'common/routes'
import Menu from 'common/Menu'

import Home from 'pages/Home'
import Dishs from 'pages/Dishs'
import Victuals from 'pages/Victuals'
import Schedules from 'pages/Schedules'

import useSocket from 'flow/socket'

function App () {
  const [connected, setConnected] = useState(false)
  const socket = useSocket()

  useEffect(() => {
    if (socket.connected) {
      setConnected(true)
    } else {
      socket.on('connect', () => {
        setConnected(true)
      })
    }
  }, [socket])

  return (
    <Router>
      <Menu />
      {
        connected && (
          <Route
            render={({ location }) => {
              return (
                <AnimatePresence exitBeforeEnter initial={false}>
                  <Switch location={location} key={location.pathname}>
                    <Route exact path={routes.home.slug}>
                      <Home />
                    </Route>
                    <Route path={routes.dishs.slug}>
                      <Dishs />
                    </Route>
                    <Route path={routes.victuals.slug}>
                      <Victuals />
                    </Route>
                    <Route path={routes.schedules.slug}>
                      <Schedules />
                    </Route>
                  </Switch>
                </AnimatePresence>
              )
            }}
          />
        )
      }
    </Router>
  )
}

export default App
