import * as d3 from "d3";

class scatterPlot {
  constructor() {
    this.svg = d3.select("#svg");
    var svgElement = document.getElementById("svg");

    this.width = svgElement.getBoundingClientRect().width;
    this.height = svgElement.getBoundingClientRect().height;

    this.duration = 1000;
  }

  clear() {
    this.svg.html("");
  }

  buildAxes() {
    this.xScale = d3
      .scaleLinear()
      .domain([0, 1])
      .range([50, this.width - 100]);

    this.yScale = d3
      .scaleLinear()
      .domain([0, 1])
      .range([this.height - 50, 50]);

    this.xSelect = this.svg
      .append("g")
      .attr("transform", `translate(0, ${this.height - 50})`)
      .call(d3.axisBottom().scale(this.xScale));
    this.ySelect = this.svg
      .append("g")
      .attr("transform", "translate(50, 0)")
      .call(d3.axisLeft().scale(this.yScale));

    this.axisHorizontal = this.svg
      .append("text")
      .attr("transform", `translate(${this.width / 2}, ${this.height - 10})`)
      .style("text-anchor", "middle")
      .text("");

    this.axisVertical = this.svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0)
      .attr("x", 0 - this.height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("");
  }

  updateAxes(params) {
    // added some filtering code
    this.fData = this.data.filter(
      d => d[params[0]] != null && d[params[1]] != null
    );

    // this.xScale.domain(d3.extent(data, d => +d[params[0]]));
    // this.yScale.domain(d3.extent(data, d => +d[params[1]]));

    // courtesy of https://stackoverflow.com/questions/34888205/insert-padding-so-that-points-do-not-overlap-with-y-or-x-axis
    var xExtent = d3.extent(this.fData, d => +d[params[0]]),
      xRange = xExtent[1] - xExtent[0],
      yExtent = d3.extent(this.fData, d => +d[params[1]]),
      yRange = yExtent[1] - yExtent[0];

    // set domain to be extent +- 5%
    this.xScale.domain([
      xExtent[0] - xRange * 0.02,
      xExtent[1] + xRange * 0.02
    ]);
    this.yScale.domain([
      yExtent[0] - yRange * 0.02,
      yExtent[1] + yRange * 0.02
    ]);

    this.xSelect
      .transition()
      .duration(this.duration)
      .call(d3.axisBottom().scale(this.xScale));
    this.ySelect
      .transition()
      .duration(this.duration)
      .call(d3.axisLeft().scale(this.yScale));

    this.axisHorizontal
      .transition()
      .duration(this.duration)
      .text(params[0]);
    this.axisVertical
      .transition()
      .duration(this.duration)
      .text(params[1]);
  }

  buildScatter(params) {
    this.updateAxes(params);

    var selection = this.svg.selectAll(".bubble").data(this.fData, d => d);
    var xScale = this.xScale;
    var yScale = this.yScale;
    var group = this.svg.append("g").attr("class", "tooltips");

    selection
      .exit()
      .transition()
      .duration(this.duration)
      .attr("r", 0)
      .remove();

    var enter = selection
      .enter()
      .append("circle")
      .attr("class", "bubble")
      .attr("r", 0)
      .attr("cx", d => xScale(+d[params[0]]))
      .attr("cy", d => yScale(+d[params[1]]))
      .style("opacity", 0.5)
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut);

    function handleMouseOver(d, i) {
      console.log("hi");

      // d3.select(this).attr("r", 10);
      group
        .append("text")
        .attr("id", "t" + i)
        .attr("class", d => console.log(d))
        .attr("x", xScale(+d[params[0]]) + 10)
        .attr("y", yScale(+d[params[1]]) - 10)
        .text(d.WSID);
    }
    function handleMouseOut(d, i) {
      group.select("#t" + i).remove();
    }

    enter
      .transition()
      .duration(this.duration)
      .attr("r", 3);
  }
}

export default scatterPlot;
