import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
import {BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Navigator from './Components/Navigator';
import { firebaseAuth } from './config';

const PrivateRoute = ({ component: Component, ...rest, isAuthenticated }) => (
  <Route {...rest} render={props => (
    isAuthenticated ? (
      <Component {...props} />
    ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
      )
  )} />
)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {user: null, isAuthenticated: false};
  }

  componentDidMount() {
    firebaseAuth().onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
        this.setState({ user: user, isAuthenticated: true });
      }
      else {
        this.setState({ user: null, isAuthenticated: false });
      }
    });
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Navigator isAuthenticated={this.state.isAuthenticated} />
            <Switch>
              <Route path="/login" component={Login} />
              <PrivateRoute isAuthenticated={this.state.isAuthenticated} path="/" component={Home} />
              <Route render={() => <h1> Page not found </h1> } />
            </Switch>
          </div>
        </BrowserRouter>  
      </div>
    );
  }
}

export default App;
