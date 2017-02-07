// var d3 = require('d3')
//
//
window.onload=function(){
  var labels = true; // show the text labels beside individual boxplots?

  var margin = {top: 30, right: 50, bottom: 70, left: 50};
  var width = 800 - margin.left - margin.right;
  var height = 400 - margin.top - margin.bottom;

  var min = Infinity,
      max = -Infinity;

  // parse in the data
  d3.csv("bar.csv", function(error, csv) {
    // using an array of arrays with
    // data[n][2]
    // where n = number of columns in the csv file
    // data[i][0] = name of the ith column
    // data[i][1] = array of values of ith column

    var data = [];
    data[0] = [];
    data[1] = [];
    data[2] = [];
    data[3] = [];
    data[4] = [];
    data[5] = [];
    data[6] = [];
    data[7] = [];
    data[8] = [];
    data[9] = [];
    data[10] = [];
    data[11] = [];
        // add more rows if your csv file has more columns

    // add here the header of the csv file
    data[0][0] = "C1";
    data[1][0] = "C2";
    data[2][0] = "C3";
    data[3][0] = "C4";
    data[4][0] = "C5";
    data[5][0] = "C6";
    data[6][0] = "C7";
    data[7][0] = "C8";
    data[8][0] = "C9";
    data[9][0] = "C10";
    data[10][0] = "C11";
    data[11][0] = "C12";
    // add more rows if your csv file has more columns

    data[0][1] = [];
    data[1][1] = [];
    data[2][1] = [];
    data[3][1] = [];
    data[4][1] = [];
    data[5][1] = [];
    data[6][1] = [];
    data[7][1] = [];
    data[8][1] = [];
    data[9][1] = [];
    data[10][1] = [];
    data[11][1] = [];

    csv.forEach(function(x) {
      console.log("x ", x)
      var v1 = Math.floor(x.C1),
        v2 = Math.floor(x.C2),
        v3 = Math.floor(x.C3),
        v4 = Math.floor(x.C4);
        v5 = Math.floor(x.C5),
        v6 = Math.floor(x.C6),
        v7 = Math.floor(x.C7);
        v8 = Math.floor(x.C8),
        v9 = Math.floor(x.C9),
        v10 = Math.floor(x.C10),
        v11 = Math.floor(x.C11),
        v12 = Math.floor(x.C12);
        // add more variables if your csv file has more columns

      var rowMax = Math.max(v1, Math.max(v2, Math.max(v3, Math.max(v4, Math.max(v5, v6)))));
      var rowMin = Math.min(v1, Math.min(v2, Math.min(v3, Math.min(v4, Math.min(v5, v6)))));
      console.log(rowMin)
      console.log(rowMax)

      data[0][1].push(v1);
      data[1][1].push(v2);
      data[2][1].push(v3);
      data[3][1].push(v4);
      data[4][1].push(v5);
      data[5][1].push(v6);
      data[6][1].push(v7);
      data[7][1].push(v8);
      data[8][1].push(v9);
      data[9][1].push(v10);
      data[10][1].push(v11);
      data[11][1].push(v12);
       // add more rows if your csv file has more columns

      if (rowMax > max) max = rowMax;
      if (rowMin < min) min = rowMin;
    });

    var chart = d3.box()
      .whiskers(iqr(1.5))
      .height(height)
      .domain([min, max])
      .showLabels(labels);

    var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("class", "box")
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // the x-axis
    var x = d3.scaleBand()
      .domain( data.map(function(d) { return d[0] } ) )
      .rangeRound([0 , width], 0.7, 0.3);
    var xAxis = d3.axisBottom()
      .scale(x)

    // the y-axis
    var y = d3.scaleLinear()
      .domain([min, max])
      .range([height + margin.top, 0 + margin.top]);

    var yAxis = d3.axisLeft()
      .scale(y)

    // draw the boxplots
    svg.selectAll(".box")
        .data(data)
      .enter().append("g")
      .attr("transform", function(d) { return "translate(" +  x(d[0])  + "," + margin.top + ")"; } )
        .call(chart.width(x.bandwidth() - 40));


    // add a title
    svg.append("text")
      .attr("x", (width / 2))
      .attr("y", 0 + (margin.top / 2))
      .attr("text-anchor", "middle")
      .style("font-size", "18px")


     // draw y axis
    svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
      .append("text") // and text1
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style("font-size", "16px")
        .text("Frequency");

    // draw x axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height  + margin.top + 10) + ")")
        .call(xAxis)
      .append("text")             // text label for the x axis
          .attr("x", (width / 2) )
          .attr("y",  10 )
      .attr("dy", ".71em")
          .style("text-anchor", "middle")
      .style("font-size", "12px")
          .text("Countries");
  });

  // Returns a function to compute the interquartile range.
  function iqr(k) {
    return function(d, i) {
      var q1 = d.quartiles[0],
          q3 = d.quartiles[2],
          iqr = (q3 - q1) * k,
          i = -1,
          j = d.length;
      while (d[++i] < q1 - iqr);
      while (d[--j] > q3 + iqr);
      return [i, j];
    };
  }
}
