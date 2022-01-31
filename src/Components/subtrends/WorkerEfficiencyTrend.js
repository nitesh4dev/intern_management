import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { makeStyles } from "@material-ui/core";

export default function WorkerEfficiencyTrend({
  timeIds,
  efficiencies,
  colours,
}) {
  //   const [dataLabel, setDataLabel] = useState([]);
  //   const [dataSeries, setDataSeries] = useState([]);

  //   useEffect(() => {
  //     const data = totalIdleHours / 60 / totalWorkersDetected;
  //     const dataArray = [];
  //     dataArray.push(parseInt(data));
  //     setDataSeries(dataArray);
  //   }, [totalIdleHours, totalWorkersDetected, colours]);

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
        name: "Efficiency",
        data: efficiencies,
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 350,
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      colors: colours,
      //   title: {
      //     text: "Fundamental Analysis of Stocks",
      //     align: "left",
      //   },
      //   subtitle: {
      //     text: "Price Movements",
      //     align: "left",
      //   },
      labels: timeIds,
      xaxis: {
        type: "time",
        title: {
          text: "Time",
        },
      },
      yaxis: {
        opposite: true,
        title: {
          text: "Efficiency in %",
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + "%";
          },
        },
      },
      legend: {
        horizontalAlign: "left",
      },
    },
  };

  return (
    <Chart
      options={options.options}
      series={options.series}
      type="area"
      height={400}
    />
  );
}
