import React from "react";
import { Switch, Route } from 'react-router-dom'

import Main from './components/templates/layouts/Main';
import District from './components/pages/Location/District'
import Province from './components/pages/Location/Province'
import Ward from './components/pages/Location/Ward'
import Category from './components/pages/Classification/Category'
import TypeGroup from './components/pages/Classification/TypeGroup'
import Type from './components/pages/Classification/Type'

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/">
          <Main>
            <h2>Main</h2>
          </Main>
        </Route>
        <Route path="/account">
          <Main>
            <h2>Account</h2>
          </Main>
        </Route>
        <Route path="/district">
          <Main>
            <District />
          </Main>
        </Route>
        <Route path="/province">
          <Main>
            <Province />
          </Main>
        </Route>
        <Route path="/ward">
          <Main>
            <Ward />
          </Main>
        </Route>
        <Route path="/category">
          <Main>
            <Category />
          </Main>
        </Route>
        <Route path="/type-group">
          <Main>
            <TypeGroup />
          </Main>
        </Route>
        <Route path="/type">
          <Main>
            <Type />
          </Main>
        </Route>
      </Switch>
    );
  }
}
export default App;
