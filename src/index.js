import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'bulma/css/bulma.css'
import App from './App'
import './styles/overrides.css';

const appRoot = document.getElementById('root')
ReactDOM.render(<App />, appRoot)


if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    ReactDOM.render(
      <NextApp />,
      appRoot
    )
  })
}
