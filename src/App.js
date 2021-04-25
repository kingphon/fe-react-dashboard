import React from "react";
import { Switch, Route } from 'react-router-dom'

import Main from './components/templates/layouts/Main';
import District from './components/pages/Location/District'
import Province from './components/pages/Location/Province'
import Ward from './components/pages/Location/Ward'
import Category from './components/pages/Classification/Category'
import TypeGroup from './components/pages/Classification/TypeGroup'
import Type from './components/pages/Classification/Type'
import Login from './components/pages/Authentication/Login'
import Test from './components/pages/Authentication/Test'
import AuthRoute from './routes/AuthRoute'

class App extends React.Component {
  render() {
    return (
      <Switch>
        <AuthRoute exact path="/">
          <Main>
            <h2>Main</h2>
          </Main>
        </AuthRoute>
        <Route path="/login">
          <Login />
        </Route>
        <AuthRoute path="/account">
          <Main>
            <Test />
          </Main>
        </AuthRoute>
        <AuthRoute path="/district">
          <Main>
            <District />
          </Main>
        </AuthRoute>
        <AuthRoute path="/province">
          <Main>
            <Province />
          </Main>
        </AuthRoute>
        <AuthRoute path="/ward">
          <Main>
            <Ward />
          </Main>
        </AuthRoute>
        <AuthRoute path="/category">
          <Main>
            <Category />
          </Main>
        </AuthRoute>
        <AuthRoute path="/type-group">
          <Main>
            <TypeGroup />
          </Main>
        </AuthRoute>
        <AuthRoute path="/type">
          <Main>
            <Type />
          </Main>
        </AuthRoute>
      </Switch>
    );
  }
}
export default App;
