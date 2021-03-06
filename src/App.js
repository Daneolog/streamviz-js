import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import TopBar from "./TopBar/TopBar";
import BottomBar from "./BottomBar/BottomBar";
import BoxPlot from "./Tabs/BoxPlot/BoxPlot";
import ScatterPlot from "./Tabs/ScatterPlot/ScatterPlot";
import TimeSeries from "./Tabs/TimeSeries/TimeSeries";
import RawData from "./Tabs/RawData/RawData";
import Login from "./Tabs/Login/Login";

import "./App.css";

import "semantic-ui-css/semantic.min.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <TopBar />
          <div id="content">
            <Route exact path="/" render={() => <Redirect to="/raw" />} />
            <Route path="/box" component={BoxPlot} />
            <Route path="/scatter" component={ScatterPlot} />
            <Route path="/time" component={TimeSeries} />
            <Route path="/login" component={Login} />
            <Route path="/raw" component={RawData} />
          </div>
          <BottomBar />
        </div>
      </Router>
    );
  }
}

export default App;
