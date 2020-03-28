import { createHashHistory } from 'history';
import * as React from 'react';
import { Route, Router } from 'react-router-dom'
import Layout from './layout'

class App extends React.Component<any, {}> {
  public render() {
   
    return (
        <Router history={createHashHistory()}>
          <Route path='/' component={Layout} />
        </Router>

    );
  }
}

export default App;
