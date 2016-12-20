var c3 = require('c3')
window.onload=function(){
  var chart = c3.generate({
    data: {
      columns: [
        ['govt', 300, 350, 300, 20, 10, 50],
        ['ngovt', 130, 100, 140, 200, 150, 50],
        ['dist', 1, 3, 5, 5, 3, 2]
      ],
      types: {
        govt: 'bar',
        ngovt: 'bar'
      },
      axes: {
        dist: 'y2'
      }
    },
    axis: {
      y: {
        padding: {bottom: 0},
        min: 0,
        label: {
          text: 'Frequency of event',
          position: 'outer-middle'
        }
      },
      x: {
      },
      y2: {
        show: true,
        max: 5,
        min: 0,
        label: {
          text: 'Distribution (high to low)',
          position: 'outer-middle'
        }
      }
    }
  });
}

console.log('welcome to gh-page-test')
