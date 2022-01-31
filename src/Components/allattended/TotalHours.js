import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { makeStyles } from "@material-ui/core";

export default function TotalHours({ totalDockedHrs, colours }) {
  const [dataLabel, setDataLabel] = useState([]);
  const [dataSeries, setDataSeries] = useState([]);

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
    series: totalDockedHrs,
    labels: ["Total Idle/Wait time", " Total Offloading time"],
    colors: colours,

    plotOptions: {
      pie: {
        donut: {
          size: "45%",
        },
      },
      options: {},
      chart: {
        type: "donut",
      },
      responsive: [
        {
          breakpoint: 600,
          options: {
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
        options={options}
        series={options.series}
        type="donut"
        height={400}
      />
    </div>
  );
}
