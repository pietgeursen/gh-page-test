var c3 = require('c3')
var d3 = require('d3')



window.onload=function(){
  var url = 'https://katiewright26.gitbooks.io/test-book/content/country'
  var arrayOfLinks = [
    url + '-1.html',
    url + '-2.html',
    url + '-3.html',
    url + '-4.html',
    url + '-5.html',
    url + '-6.html',
    url + '-7.html',
    url + '-8.html',
    url + '-9.html',
    url + '-10.html',
    url + '-11.html',
    url + '-12.html'
    ]


  var chart = c3.generate({
    data: {
      columns: [
        ['govt', 0.3, 0.35, 0.3, 0.8, 0.1, 0.5, 0.75, 0.64, 0.1, 0.15, 0.9, 0.66],
        ['ngovt', 0.39, 0.3, 0.8, 0.2, 0.75, 0.5, 0.7, 0.45, 0.27, 0.4, 0.8, 0.32],
        ['dist', 1, 3, 5, 5, 3, 2, 2, 4, 5, 1, 1, 0]
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
        categories: ['Country 1', 'Country 2', 'Country 3', 'Country 4', 'Country 5', 'Country 6',
      'Country 7', 'Country 8', 'Country 9', 'Country 10', 'Country 11', 'Country 12'],
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
