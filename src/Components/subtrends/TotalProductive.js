import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { makeStyles } from "@material-ui/core";
import { db } from "../../firebase/Firebase";
export default function TotalProductive({
  totalProductiveHours,
  totalIdleHours,
  colours,
}) {
  // const [dataSeries, setDataSeries] = useState([]);

  // useEffect(() => {
  const dataArray = [totalProductiveHours, totalIdleHours];
  // setDataSeries(dataArray);
  // }, [totalProductiveHours, totalIdleHours, colours]);

  // console.log(dataSeries);

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
    series: [totalProductiveHours, totalIdleHours],
    options: {
      labels: ["Total Productive Time", "Total Idle Time"],
      chart: {
        type: "donut",
      },
      colors: colours,
      tooltip: {
        enabled: true,
        y: {
          formatter: (value) => {
            return value + " mins";
          },
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
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
        type="donut"
        height={400}
      />
    </div>
  );
}
