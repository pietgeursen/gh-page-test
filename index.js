var c3 = require('c3')
window.onload=function(){
  var chart = c3.generate({
    data: {
      columns: [
        ['data1', 300, 350, 300, 0, 0, 0],
        ['data2', 130, 100, 140, 200, 150, 50]
      ],
      types: {
        data1: 'area',
        data2: 'area-spline'
      }
    },
    axis: {
      y: {
        padding: {bottom: 0},
        min: 0
      },
      x: {
        padding: {left: 0},
        min: 0,
        show: false
      }
    }
  });
}

console.log('welcome to gh-page-test')
