var d3 = require('d3')


window.onload=function(){
  var svg = d3.select("svg");
  var margin = {top: 20, right: 20, bottom: 30, left: 40};
  var width = svg.attr("width") - margin.left - margin.right;
  var height = svg.attr("height") - margin.top - margin.bottom;

  var x0 = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.1);

  var x1 = d3.scaleBand()
    .padding(0.05);

  var y = d3.scaleLinear()
    .rangeRound([height, 0]);

  var z = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6"]);

  // load the data
  d3.csv("bar.csv", function(d, i, columns) {
    for (var i = 1, n = columns.length; i < n; ++i)
      d[columns[i]] = +d[columns[i]];
    return d;
  }, function(error, data) {
    if (error) throw error;
    var name = "Frequency";
    var keys = data.columns.slice(1, 3);
    console.log(keys)
    document.querySelector("#frequency").onchange = getFrequency
    document.querySelector("#distribution").onchange = getDistribution
    // document.querySelector("#margin").onchange = getMargin

    renderGraph(name, keys, data);

    function renderGraph(name, keys, data) {
      x0.domain(data.map(function(d) { return d.name; }));
      x1.domain(keys).rangeRound([0, x0.bandwidth()]);
      y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();
      svg.selectAll("*").remove()
      var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      g.append("g")
        .selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function(d) { return "translate(" + x0(d.name) + ",0)"; })
        .selectAll("rect")
        .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
        .enter().append("rect")
        .attr("x", function(d) { return x1(d.key); })
        .attr("y", function(d) {
          return y(d.value); })
        .attr("width", x1.bandwidth())
        .attr("height", function(d) { return height - y(d.value); })
        .attr("fill", function(d) { return z(d.key); });

      g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x0));

      g.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y).ticks(null, "s"))
        .append("text")
        .attr("x", 2)
        .attr("y", y(y.ticks().pop()) + 0.5)
        .attr("dy", "0.32em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start")
        .text(name);

      var legend = g.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(keys.slice().reverse())
        .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

      legend.append("rect")
        .attr("x", width - 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", z);

      legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function(d) { return d; });

    }

    function getFrequency() {
      var keys = data.columns.slice(1,3);
      var name = "Frequency"
      console.log("render graph ", keys, data)
      renderGraph(name, keys, data)
    }
    function getDistribution() {
      var keys = data.columns.slice(3);
      var name = "Distribution"
      renderGraph(name, keys, data)
    }
    function getMargin() {
      var keys = data.columns.slice(5);
      var name = "Margin of Error"
      renderGraph(name, keys, data)
    }
  });

}

console.log('welcome to gh-page-test')
