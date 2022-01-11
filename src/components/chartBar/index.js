import React from 'react';
import styled, { css } from 'styled-components';

import './index.css';
import ReactApexChart from "react-apexcharts";
import axios from "axios";



class ApexChart extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        viewCompleted: false,
        todoList: [],
      
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

    componentDidMount() {
      this.refreshList();
    }
  
    refreshList = () => {
      axios
        .get("http://127.0.0.1:8000/show/some_view")
        // .get("/show/some_view/")
        .then((res) => this.setState({ todoList: res.data  }, console.log(res.data)))
        .catch((err) => console.log(err));
    };

    toggle = () => {
      this.setState({ modal: !this.state.modal });
    };

    

    render() {
      return (
        
        
    <div id="chart">
        <ReactApexChart
        options={this.state.options} series={this.state.series} type="bar" height={350}
        />
        <div>
            <div className="nav nav-tabs">
                    <span
                      onClick={() => this.displayCompleted(true)}
                      className={this.state.viewCompleted ? "nav-link active" : "nav-link"}
                    >
                      Complete
                    </span>
                    <span
                      onClick={() => this.displayCompleted(false)}
                      className={this.state.viewCompleted ? "nav-link" : "nav-link active"}
                    >
                      Incomplete
                    </span>
                    <button onClick={() => this.refreshList()}>
                      teste
                    </button>
            </div>
        </div>    
    </div>
  

     );
    }
  }
export default ApexChart;

