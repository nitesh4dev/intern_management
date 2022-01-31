import React, { useEffect, useState, useContext } from "react";
import Chart from "react-apexcharts";
import { makeStyles } from "@material-ui/core";
import { DataContext } from "../../Context/DataContext";

export default function Achieved({ totalWorkersDetected, colours }) {
  const { expected } = useContext(DataContext);
  const [dataLabel, setDataLabel] = useState([]);
  const [dataSeries, setDataSeries] = useState([]);

  useEffect(() => {
    const labelArray = [];
    const dataArray = [];
    let workersArray = [4, 3, 5, 2, totalWorkersDetected];
    workersArray.map((val) => {
      dataArray.push(val * expected);
    });
    setDataLabel(labelArray);
    setDataSeries(dataArray);
  }, [totalWorkersDetected, colours]);

  // const options = {
  //     series : [30,70],
  //     labels: ['Total Idle/ Wait time' , ' Total Offloading time'],

  // }
  // const series = [{
  //     name: 'man-hours',
  //     // data: dataSeries
  //     data: [30,70]
  // }]

  // const series = [{
  //     name: 'Website Blog',
  //     type: 'column',
  //     data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160]
  //   }, {
  //     name: 'Social Media',
  //     type: 'line',
  //     data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]

  // }]

  var options = {
    series: [
      {
        name: "Expected",
        data: dataSeries,
      },
      {
        name: "Achieved ",
        data: [20, 21, 20, 19, 22],
      },
    ],
    chart: {
      type: "bar",
      height: 350,
    },
    colors: colours,
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "65%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["19Nov", "20Nov", "21Nov", "22Nov", "23Nov"],
    },
    yaxis: {
      title: {},
    },
    fill: {
      opacity: 1,
    },
  };
  return (
    <div>
      <Chart
        options={options}
        series={options.series}
        type="bar"
        height={340}
      />
    </div>
  );
}
