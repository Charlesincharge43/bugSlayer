'use strict'
import React from 'react'
// import {Router, Route, IndexRedirect, browserHistory} from 'react-router'

import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {
  HashRouter,
  Route,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom';

import Root from './Root.jsx'
import store from './store'

import NotFound from './components/NotFound'

render(
  <Provider store={store}>
    {/* <HashRouter history={browserHistory}> how do i do browserHistory*/}
    <HashRouter>
      <div>
        {/* <Route path="/" component={ExampleApp} /> */}
        <Switch>
          <Route path="/root" component={Root} />
          <Redirect exact from="/" to="/root" />
          <Route component={NotFound} />
        </Switch>
      </div>
    </HashRouter>
  </Provider>,
  document.getElementById('main')
)
