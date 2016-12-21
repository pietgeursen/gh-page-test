var c3 = require('c3')
var d3 = require('d3')



window.onload=function(){
  var arrayOfLinks = ['http://google.com','http://www.facebook.com','http://www.yahoo.com','www.bing.com', 'http://www.google.com', 'http://www.github.com']

  
  var chart = c3.generate({
    data: {
      columns: [
        ['govt', 0.3, 0.35, 0.3, 0.8, 0.1, 0.5],
        ['ngovt', 0.39, 0.3, 0.8, 0.2, 0.75, 0.5],
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
        max: 0.9,
        label: {
          text: 'Frequency (%)',
          position: 'outer-middle'
        },
        tick: {
          format: d3.format("%,")
        }
      },
      x: {
        type: 'category',
        categories: ['Group 1', 'Group 2', 'Group 3', 'Group 4', 'Group 5', 'Group 6'],
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

  d3.selectAll('.c3-axis-x .tick tspan').each(function(d,i) {
    var self = d3.select(this);
    console.log(self)
    var text = self.text();
    self.html("<a xlink:href='"+arrayOfLinks[i]+"'>"+text+"</a>");
  })
}

console.log('welcome to gh-page-test')
