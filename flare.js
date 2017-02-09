window.onload=function(){
  var width = 950;
  var height = 700;
  var radius = (Math.min(width, height) / 2) - 100;
  var formatNumber = d3.format(",d");

  var x = d3.scaleLinear()
      .range([0, 2* Math.PI]);

  var y = d3.scaleSqrt()
      .range([0, radius]);

  var color = d3.scaleOrdinal(d3.schemeCategory20);

  var partition = d3.partition();

  var arc = d3.arc()
      .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x0))); })
      .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x1))); })
      .innerRadius(function(d) { return Math.max(0, y(d.y0)); })
      .outerRadius(function(d) { return Math.max(0, y(d.y1)); });

  var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height)
          .append("g")
            .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

  var text,
      path;

  d3.json("flare.json", function(error, root) {
    if (error) throw error;

    root = d3.hierarchy(root);
    root.sum(function(d) { return d.size; });

    svg.selectAll("path")
        .data(partition(root).descendants())
        .enter().append("g").attr("class", "node");

    path = svg.selectAll(".node")
      .append("path")
      .attr("d", arc)
      .style("fill", function(d) {return color((d.children ? d : d.parent).data.name); })
      .on("click", click);


    text = svg.selectAll(".node")
         .append("text")
            .attr("transform", function(d) {
               return "rotate(" + computeTextRotation(d) + ")";
            })
            .attr("x", function(d) {
               return y(d.y0);
            })
            .attr("dx", "6") // margin
            .attr("dy", ".35em") // vertical-align
            .text(function(d) {
                return d.data.name === "root" ? "" : d.data.name
            });


  });


  function click(d) {

    text.transition().attr("opacity", 0);

    svg.transition()
        .duration(750)
        .tween("scale", function() {
          var xd = d3.interpolate(x.domain(), [d.x0, d.x1]),
              yd = d3.interpolate(y.domain(), [d.y0, 1]),
              yr = d3.interpolate(y.range(), [d.y0 ? 20 : 0, radius]);
          return function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); };
        })
      .selectAll("path")
      .attrTween("d", function(d) { return function() { return arc(d); }; })
      .on("end", function(e, i) {
        if (e.x0 > d.x0 && e.x0 < d.x1) {
          var arcText = d3.select(this.parentNode).select("text");

          arcText.transition().duration(750)
              .attr("opacity", 1)
              .attr("class", "visible")
              .attr("transform", function() {return "rotate(" + computeTextRotation(e) + ")" })
              .attr("x", function(d) {return y(d.y0); })
              .text(function(d) {
                return d.data.name === "root" ? "" : d.data.name
              });
        }
      });
  }

  function computeTextRotation(d) {
    return (x((d.x0 + d.x1) / 2) - Math.PI / 2) / Math.PI * 180;
  }

  d3.select(self.frameElement).style("height", height + "px");
}
