import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import MainPage from './MainPage';
import SearchPage from './SearchPage';

class BooksApp extends React.Component {

  render() {
    return (
      // <AppRouter/>
      <Router>
      <div>
        <Switch>
          <Route path="/search">
            <SearchPage/>
          </Route>
          <Route path="/">
            <MainPage/>
          </Route>
        </Switch>
      </div>
    </Router>
    )
  }
}

export default BooksApp
