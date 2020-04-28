import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomeScreen from './screens/HomeScreen';
import Auth from './screens/Auth';
import Other from './screens/Other';
import NotFound from './screens/404';

const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={HomeScreen} />
      <Route path="/auth" component={Auth} />
      <Route path="/other" component={Other} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default App;
