import React from 'react'
import ReactDOM from 'react-dom'

import GlobalStyles from 'common/styles/GlobalStyles'

import App from './App'
import * as serviceWorker from './serviceWorker'

const render = (Component) => {
  return ReactDOM.render(
    <React.StrictMode>
      <GlobalStyles />
      <Component />
    </React.StrictMode>,
    document.getElementById('root')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    render(NextApp)
  })
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
