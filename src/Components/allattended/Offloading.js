import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { makeStyles } from "@material-ui/core";

export default function Offloading({
  docArray,
  totalTrucksArray,
  dockedTime,
  colours,
}) {
  const [dataLabel, setDataLabel] = useState([]);
  const [dataSeries, setDataSeries] = useState([]);

  useEffect(() => {
    const labelArray = [];
    const dataArray = [];
    dockedTime.map((val) => {
      let data = ((val / dockedTime.reduce((a, b) => a + b, 0)) * 100).toFixed(
        2
      );
      dataArray.push(data);
    });
    setDataLabel(labelArray);
    setDataSeries(dataArray);
  }, [docArray, totalTrucksArray, dockedTime, colours]);
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

  return (
    <div>
      <Chart
        series={[
          {
            name: "Offloading Cycles",
            type: "column",
            data: totalTrucksArray,
          },
          {
            name: "Occupancy in %",
            type: "line",
            data: dataSeries,
          },
        ]}
        options={{
          labels: ["Dock1", "Dock2", "Dock3", "Dock4"],
          colors: colours,
        }}
        height={300}
      />
    </div>
  );
}
