import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { makeStyles } from "@material-ui/core";

export default function AverageTime({ avgOffloading, avgIdleTime, colours }) {
  const [dataLabel, setDataLabel] = useState([]);
  const [dataSeries, setDataSeries] = useState([]);

  useEffect(() => {
    const labelArray = [];
    const dataArray = [avgOffloading, avgIdleTime];
    setDataLabel(labelArray);
    setDataSeries(dataArray);
  }, [avgOffloading, avgIdleTime, colours]);
  console.log();

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
    series: dataSeries,
    options: {
      chart: {
        height: 390,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: "20%",
            background: "transparent",
            image: undefined,
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: false,
            },
          },
        },
      },
      colors: colours,
      labels: ["Avg offloading time", "Avg Idle time per truck "],
      legend: {
        show: true,
        floating: true,
        fontSize: "13px",
        position: "top",
        offsetX: 0,
        offsetY: 0,
        labels: {
          useSeriesColors: true,
        },
        markers: {
          size: 0,
        },
        formatter: function (seriesName, opts) {
          return (
            seriesName +
            ":  " +
            opts.w.globals.series[opts.seriesIndex] +
            " mins"
          );
        },
        itemMargin: {
          vertical: 3,
        },
      },
      tooltip: {
        enabled: true,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: false,
            },
          },
        },
      ],
    },
  };

  return (
    <div>
      <Chart
        options={options.options}
        series={options.series}
        type="radialBar"
        height={400}
      />
    </div>
  );
}
