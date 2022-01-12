import React, {useState} from 'react';
import styled, { css } from 'styled-components';

import './index.css';
import ReactApexChart from "react-apexcharts";
import axios from "axios";
// import ApexChart from "react-apexcharts"

// interface TaskTimeData {
//   name : string;
//   data: Array<number>
// }

let taskTimeMeanObj = {};
taskTimeMeanObj.cleanTextProcessorSeg = 0;
taskTimeMeanObj.filterProcessedFilesSeg  = 0;
taskTimeMeanObj.imageConverterProcessorSeg = 0;
taskTimeMeanObj.nonTextBlockFilterSeg = 0;
taskTimeMeanObj.objectDetectionProcessorSeg = 0;
taskTimeMeanObj.textExtractionProcessorSeg = 0;

function saveTaskTimes(res) {
  taskTimeMeanObj.cleanTextProcessorSeg = res.data['CleanTextProcessorSeg'];
  taskTimeMeanObj.filterProcessedFilesSeg= res.data['FilterProcessedFilesSeg'];
  taskTimeMeanObj.imageConverterProcessorSeg =  res.data['ImageConverterProcessorSeg'];
  taskTimeMeanObj.nonTextBlockFilterSeg = res.data['NonTextBlockFilterSeg'];
  taskTimeMeanObj.objectDetectionProcessorSeg = res.data['ObjectDetectionProcessorSeg'];
  taskTimeMeanObj.textExtractionProcessorSeg = res.data['TextExtractionProcessorSeg'];

  console.log(taskTimeMeanObj)


}


let url ="http://127.0.0.1:8000/show/some_view"



// const seriesTest: TaskTimeData[] =   [{
//   name: 'ImageConverterProcessor',
//   data: [44]
// }, {
//   name: 'ObjectDetectionProcessor',
//   data: [53]
// }, {
//   name: 'TextExtractionProcessor',
//   data: [12]
// }, {
//   name: 'FilterProcessedFiles',
//   data: [9]
// }, {
//   name: 'NonTextBlockFilter',
//   data: [25]
// },{
//   name: 'CleanTextProcessor',
//   data: [9]
// }];

// const ApexChart: React.FC = () => {
//    const [series, setSeries] = useState<TaskTimeData[]>(seriesTest);
class ApexChart extends React.Component {   
  refreshList = () => {
    axios
      .get("http://127.0.0.1:8000/show/some_view")
      .then(res => saveTaskTimes(res))
      .catch((err) => console.log(err));
  };

  upDateTaskMeanTime = (params) => {
    refreshList();
     this.setState({ series: 
      [{
        name: 'ImageConverterProcessor',
        data: [taskTimeMeanObj.imageConverterProcessorSeg]
      }, {
        name: 'ObjectDetectionProcessor',
        data: [taskTimeMeanObj.objectDetectionProcessorSeg]
      }, {
        name: 'TextExtractionProcessor',
        data: [taskTimeMeanObj.textExtractionProcessorSeg]
      }, {
        name: 'FilterProcessedFiles',
        data: [taskTimeMeanObj.filterProcessedFilesSeg]
      }, {
        name: 'NonTextBlockFilter',
        data: [taskTimeMeanObj.nonTextBlockFilterSeg]
      },{
        name: 'CleanTextProcessor',
        data: [taskTimeMeanObj.cleanTextProcessorSeg]
      }],
    
  


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
          data: [15]
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
        
    // console.log('teste'),    
    <div id="chart">
        <ReactApexChart
         options={this.state.options} series={this.state.series} type="bar" height={350}
        //  series={series} type="bar" height={350}
        />
        <div>
            <div className="nav nav-tabs">
                   
                    <button onClick={() => this.refreshList()}>
                      PrintObjectTaskMeanTime
                    </button>
                    

                    <button onClick={() => this.setState({ series: 
                            [{
                              name: 'ImageConverterProcessor',
                              data: [taskTimeMeanObj.imageConverterProcessorSeg]
                            }, {
                              name: 'ObjectDetectionProcessor',
                              data: [taskTimeMeanObj.objectDetectionProcessorSeg]
                            }, {
                              name: 'TextExtractionProcessor',
                              data: [taskTimeMeanObj.textExtractionProcessorSeg]
                            }, {
                              name: 'FilterProcessedFiles',
                              data: [taskTimeMeanObj.filterProcessedFilesSeg]
                            }, {
                              name: 'NonTextBlockFilter',
                              data: [taskTimeMeanObj.nonTextBlockFilterSeg]
                            },{
                              name: 'CleanTextProcessor',
                              data: [taskTimeMeanObj.cleanTextProcessorSeg]
                            }],

                    
                    
                    })}>
                      Click me to Update Plot
                    </button>
            </div>
        </div>    
    </div>
  

  );
}
}
  
export default ApexChart