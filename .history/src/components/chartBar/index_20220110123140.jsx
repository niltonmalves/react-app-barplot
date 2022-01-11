import React from 'react';
import styled, { css } from 'styled-components';

import './index.css';
import ReactApexChart from "react-apexcharts";



class ApexChart extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [{
          name: 'ImageConverterProcessor',
          data: [44]
        }, {
          name: 'ObjectDetectionProcessor',
          data: [53]
        }, {
          name: 'TextExtractionProcessor',
          data: [12]
        }, {
          name: 'FilterProcessedFiles',
          data: [9]
        }, {
          name: 'NonTextBlockFilter',
          data: [25]
        },{
          name: 'CleanTextProcessor',
          data: [9]
        }
        ],
        options: {
          chart: {
            type: 'bar',
            height: 350,
            stacked: true,
          },
          plotOptions: {
            bar: {
              horizontal: true,
            },
          },
          stroke: {
            width: 1,
            colors: ['#fff']
          },
          title: {
            text: 'Average task time'
          },
          xaxis: {
            categories: ['média em seg'],

            labels: {
              formatter: function (val) {
                return val + "s"
              }
            }
          },
          yaxis: {
            title: {
              text: undefined
            },
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val + "s"
              }
            }
          },
          fill: {
            opacity: 1
          },
          legend: {
            position: 'top',
            horizontalAlign: 'left',
            offsetX: 40
          }
        },
      
      
      };
    }

  

    render() {
      return (
        

    <div id="chart">
        <ReactApexChart
         options={this.state.options} series={this.state.series} type="bar" height={350}
        />
    </div>
     );
    }
  }
export default ApexChart;

