import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { store } from './app/store'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'

// Routerで設定
import { Route, BrowserRouter } from 'react-router-dom'

import Login from 'features/login/Login'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* ↓Router設定 */}
      <BrowserRouter>
        <Route exact path="/" component={Login} />
        <Route exact path="/tasks" component={App} />
      </BrowserRouter>
      {/* ↑Router設定 */}
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
