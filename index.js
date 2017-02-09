var d3 = require('d3');
var createBoxPlot = require('./box');
var appendData = require('./boxplot');

d3.box = createBoxPlot()
window.onload = () => appendData(d3)
