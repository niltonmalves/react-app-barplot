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
taskTimeMeanObj.cleanTextProcessorSeg = 50;
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

  console.log(taskTimeMeanObj.cleanTextProcessorSeg)


}


let url ="http://127.0.0.1:8000/show/some_view"

function axiosTest() {
  // create a promise for the axios request
  const promise = axios.get(url)

  // using .then, create a new promise which extracts the data
  const dataPromise = promise.then((response) => response.data)

  // return it
  return dataPromise
}

// now we can use that data from the outside!
axiosTest()

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
          data: [taskTimeMeanObj.cleanTextProcessorSeg]
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
     axiosTest2() {
      const response = axios.get(url)
      return response.data
  }
   
    componentDidMount() {
      this.refreshList();
      this.setState({
        'data':  144
      });

    }
    

    toggle = () => {
      this.setState({ modal: !this.state.modal });
      console.log()
    };

   
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
                    <button onClick={() =>axiosTest()}> teste 2</button>
                    <button onClick={() =>this.axiosTest2()}> teste 3</button>
            </div>
        </div>    
    </div>
  

  );
}
}
  
export default ApexChart