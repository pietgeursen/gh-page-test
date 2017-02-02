var d3 = require('d3')


window.onload=function(){
  var svg = d3.select("svg");
  var margin = {top: 20, right: 20, bottom: 30, left: 40};
  var width = svg.attr("width") - margin.left - margin.right;
  var height = svg.attr("height") - margin.top - margin.bottom;
  var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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
      var name = "";
      var keys = null;
      document.getElementById("frequency").addEventListener("click", getFrequency())
      document.getElementById("margin").addEventListener("click", getMargin())
      document.getElementById("distribution").addEventListener("click", getDistribution())

      function getFrequency() {
        keys = data.columns.slice(1, 3);
        name = "Frequency"
      }
      function getDistribution() {
        keys = data.columns.slice(3);
        name = "Distribution"
      }
      function getMargin() {
        keys = data.columns.slice(5);
        name = "Margin of Error"
      }
        x0.domain(data.map(function(d) { return d.name; }));
        x1.domain(keys).rangeRound([0, x0.bandwidth()]);
        y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();
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
      });
      //SUNBURST
      // var width = window.innerWidth / 2;
      // var height = window.innerWidth / 2;
    //   var radius = (Math.min(width, height) / 2) - 100;
    //   var formatNumber = d3.format(",d");
    //
    //   var x = d3.scaleLinear()
//       .range([0, 2* Math.PI]);
//
//   var y = d3.scaleSqrt()
//       .range([0, radius]);
//
//   var color = d3.scaleOrdinal(d3.schemeCategory20);
//
//   var partition = d3.partition();
//
//   var arc = d3.arc()
//       .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x0))); })
//       .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x1))); })
//       .innerRadius(function(d) { return Math.max(0, y(d.y0)); })
//       .outerRadius(function(d) { return Math.max(0, y(d.y1)); });
//
//
//   var svg = d3.select("body").append("svg").attr("width", width).attr("height", height).append("g").attr("transform", "translate(" + width / 3 + "," + (height / 2) + ")");
//
//   d3.json("flare.json", function(error, root) {
//     if (error) throw error;
//     root = d3.hierarchy(root);
//     root.sum(function(d) { return d.size; });
//     var path = svg.selectAll("path")
//       .data(partition(root).descendants())
//       .enter().append("path")
//       .attr("d", arc)
//       .style("fill", function(d) { return color((d.children ? d : d.parent).data.name); })
//       .on("click", click)
//       .append("title")
//       .text(function(d) { return d.data.name + "\n" + formatNumber(d.value); });
//
//   });
//   function computeTextRotation(d) {
//     return (x(d.x + d.dx / 2) - Math.PI / 2) / Math.PI * 180;
//   }
//   function click(d) {
//     svg.transition()
//         .duration(750)
//         .tween("scale", function() {
//           var xd = d3.interpolate(x.domain(), [d.x0, d.x1]),
//               yd = d3.interpolate(y.domain(), [d.y0, 1]),
//               yr = d3.interpolate(y.range(), [d.y0 ? 20 : 0, radius]);
//           return function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); };
//         })
//       .selectAll("path")
//       .attrTween("d", function(d) { return function() { return arc(d); }; });
//   }
//
//   d3.select(self.frameElement).style("height", height + "px");
}

console.log('welcome to gh-page-test')
