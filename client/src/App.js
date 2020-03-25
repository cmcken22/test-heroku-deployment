import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import logo from "./images/Reddit.jpg";
import "./App.css";
// import Scrape from "./scrape";
import Startscrape from "./pages/Startscrape";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to MyNewsNow REACT</h2>
          </div>
          <Switch>
            <Route exact path="/test" component={Startscrape} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
