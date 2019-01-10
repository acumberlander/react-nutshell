import React from 'react';
import 'reactstrap';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import connection from '../Helpers/Data/connection';

import Auth from '../components/Pages/Auth/Auth';
import Home from '../components/Pages/Home/home';
import Friends from '../components/Pages/Friends/friends';
import Articles from '../components/Pages/Articles/articles';
import Weather from '../components/Pages/Weather/weather';
import Events from '../components/Pages/Events/events';
import Messages from '../components/Pages/Messages/messages';
import MyNavbar from '../components/MyNavbar/myNavbar';
import './App.scss';
import authRequests from '../Helpers/Data/authRequests';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component { ...props } />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component { ...props } />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
    pendingUser: true,
  }

  componentDidMount() {
    connection();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          pendingUser: false,
        });
      } else {
        this.setState({
          authed: false,
          pendingUser: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const {
      authed,
      pendingUser,
    } = this.state;
    const logoutClickEvent = () => {
      authRequests.logoutUser();
      this.setState({ authed: false });
    };

    if (pendingUser) {
      return null;
    }

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar isAuthed={authed} logoutClickEvent={logoutClickEvent} />
            <div className="container">
              <div className="row">
                <Switch>
                  <PrivateRoute path='/' exact component={Home} authed={this.state.authed} />
                  <PrivateRoute path='/home' component={Home} authed={this.state.authed} />
                  <PrivateRoute path='/friends' component={Friends} authed={this.state.authed} />
                  <PrivateRoute path='/articles' component={Articles} authed={this.state.authed} />
                  <PrivateRoute path='/weather' component={Weather} authed={this.state.authed} />
                  <PrivateRoute path='/events' component={Events} authed={this.state.authed} />
                  <PrivateRoute path='/messages' component={Messages} authed={this.state.authed} />
                  <PublicRoute path='/auth' component={Auth} authed={this.state.authed}/>
                </Switch>
              </div>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
