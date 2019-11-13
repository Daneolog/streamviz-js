import React, { Component } from "react";
import "./ScatterPlot.css";

import scatterPlot from "./scatter";
import { Dropdown, Checkbox } from "semantic-ui-react";
/* The class to draw a scatterplot using the methods in scatter.js*/
class RawData extends Component {
  params = [];

  constructor() {
    super();
    this.state = { keys: [], data: [] };

    this.setParam = this.setParam.bind(this);
    this.toggleLine = this.toggleLine.bind(this);
    this.toggleScale = this.toggleScale.bind(this);
  }

  componentDidMount() {
    this.scatter = new scatterPlot();
    this.scatter.clear();
    this.scatter.buildAxes();

    fetch("http://localhost:5000/streams")
      .then(response => response.json())
      .then(result => {
        var variables = Object.keys(result[0]);
        //remove variables that we do not want the ability to graph
        //WSID is just an ID so the graph is not very useful
        //ecoli method is the method which which ecoli info was collected
        //a scatter plot of date is not important
        variables.splice(variables.indexOf("WSID"), 1);
        variables.splice(variables.indexOf("ecoli_method"), 1);
        variables.splice(variables.indexOf("date"), 1);

        this.setState({ keys: variables });

        var WSIDs = result.map(row => row.WSID);
        WSIDs = [...new Set(WSIDs)];
        WSIDs = WSIDs.map(id => ({ key: id, text: id, value: id }));

        result.forEach(
          d => (d.date = d.date == null ? null : new Date(d.date))
        );
        this.scatter.data = result;
      });
  }

  setParam(i, data) {
    this.params[i] = data;

    if (this.params.length === 2) {
      this.scatter.buildScatter(
        this.params,
        this.state.isLog,
        this.state.showLine
      );
    }
  }

  toggleLine() {
    this.setState({ showLine: !this.state.showLine }, () =>
      this.scatter.buildScatter(
        this.params,
        this.state.isLog,
        this.state.showLine
      )
    );
  }

  toggleScale() {
    this.setState({ isLog: !this.state.isLog }, () =>
      this.scatter.buildScatter(
        this.params,
        this.state.isLog,
        this.state.showLine
      )
    );
  }

  render() {
    var options = this.state.keys.map(key => {
      return { key: key, text: key, value: key };
    });

    return (
      <div className="container">
        <div className="sidebar">
          <h2>Choose Data</h2>
          <p>Variable 1:</p>
          <Dropdown
            placeholder="Variable"
            fluid
            selection
            options={options}
            onChange={(_, data) => this.setParam(0, data.value)}
          />
          <p>Variable 2:</p>
          <Dropdown
            placeholder="Variable"
            fluid
            selection
            options={options}
            onChange={(_, data) => this.setParam(1, data.value)}
          />
        </div>
        <div className="content">
          <svg id="svg" width="1195.5px" height="95%" />
          <br />
          <Checkbox
            toggle
            label="Show line of best fit"
            onChange={this.toggleLine}
          />
          <Checkbox
            toggle
            label="Logarithmic scale"
            onChange={this.toggleScale}
          />
        </div>
      </div>
    );
  }
}

export default RawData;
