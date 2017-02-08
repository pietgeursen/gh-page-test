
window.onload=function(){
  var labels = false; // show the text labels beside individual boxplots?

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

    var data1 = [];
    data1[0] = [];
    data1[1] = [];
    data1[2] = [];
    data1[3] = [];
    data1[4] = [];
    data1[5] = [];
    data1[6] = [];
    data1[7] = [];
    data1[8] = [];
    data1[9] = [];
    data1[10] = [];
    data1[11] = [];        // add more rows if your csv file has more columns

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

    data1[0][0] = "C1";
    data1[1][0] = "C2";
    data1[2][0] = "C3";
    data1[3][0] = "C4";
    data1[4][0] = "C5";
    data1[5][0] = "C6";
    data1[6][0] = "C7";
    data1[7][0] = "C8";
    data1[8][0] = "C9";
    data1[9][0] = "C10";
    data1[10][0] = "C11";
    data1[11][0] = "C12";
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

    data1[0][1] = [];
    data1[1][1] = [];
    data1[2][1] = [];
    data1[3][1] = [];
    data1[4][1] = [];
    data1[5][1] = [];
    data1[6][1] = [];
    data1[7][1] = [];
    data1[8][1] = [];
    data1[9][1] = [];
    data1[10][1] = [];
    data1[11][1] = [];

    csv.forEach(function(x) {
      var v1 = Math.floor(x.C1G),
        v2 = Math.floor(x.C2G),
        v3 = Math.floor(x.C3G),
        v4 = Math.floor(x.C4G);
        v5 = Math.floor(x.C5G),
        v6 = Math.floor(x.C6G),
        v7 = Math.floor(x.C7G);
        v8 = Math.floor(x.C8G),
        v9 = Math.floor(x.C9G),
        v10 = Math.floor(x.C10G),
        v11 = Math.floor(x.C11G),
        v12 = Math.floor(x.C12G),
        v13 = Math.floor(x.C1NG),
        v14 = Math.floor(x.C2NG),
        v15 = Math.floor(x.C3NG),
        v16 = Math.floor(x.C4NG),
        v17 = Math.floor(x.C5NG),
        v18 = Math.floor(x.C6NG),
        v19 = Math.floor(x.C7NG),
        v20 = Math.floor(x.C8NG),
        v21 = Math.floor(x.C9NG),
        v22 = Math.floor(x.C10NG),
        v23 = Math.floor(x.C11NG),
        v24 = Math.floor(x.C12NG);

        // add more variables if your csv file has more columns

      var rowMax = 5;
      var rowMin = 0;

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
      data1[0][1].push(v13);
      data1[1][1].push(v14);
      data1[2][1].push(v15);
      data1[3][1].push(v16);
      data1[4][1].push(v17);
      data1[5][1].push(v18);
      data1[6][1].push(v19);
      data1[7][1].push(v20);
      data1[8][1].push(v21);
      data1[9][1].push(v22);
      data1[10][1].push(v23);
      data1[11][1].push(v24);

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
    svg.selectAll(".government.box")
        .data(data)
      .enter().append("g")
      .attr("class", "government")
      .attr("transform", function(d) {
        return "translate(" +  (x(d[0]) + 20)  + "," + margin.top + ")"; } )
        .call(chart.width(x.bandwidth() - 45));

  svg.selectAll(".non-government.box")
      .data(data1)
    .enter().append("g")
    .attr("class", "non-government")
    .attr("transform", function(d) {
      return "translate(" +  (x(d[0]) + 35)  + "," + margin.top + ")"; } )
      .call(chart.width(x.bandwidth() - 45));

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
