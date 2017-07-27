import React from 'react'
import {connect} from 'react-redux'
import {Route, Switch, Redirect} from 'react-router-dom'

import Jokes from './components/Jokes'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'
import ConnectedCodePage from './components/CodePage'

class Root extends React.Component {
  constructor(){
    super()
    this.state = {activeItem: ''}
  }

  handleItemClick = (e, {name}) => this.setState({activeItem: name })

  render(){
    let user = this.props.user;
    let match = this.props.match;
    return (
      <div>
        {/* <nav>
          <div className="nav nav-tabs">
              <span>Home | </span>
              <span>Play | </span>
              <span>Levels</span>
            {user ? <WhoAmI/> : <Login/>}
          </div>
        </nav> */}
        <Switch>
          {/* <Route exact path={`${match.url}`} /> */}
          <Route exact path={`${match.url}/code`} component={ConnectedCodePage} />
          <Redirect exact from={`${match.url}`} to={`${match.url}/code`} />
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

const mapState = ({ auth }) => ({ user: auth });
export default connect(mapState)(Root);
