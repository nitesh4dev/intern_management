import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

export default function SecondGraph({
  offloadingPerDock,
  idleTimePerDock,
  dockedTime,
  colours,
}) {
  const [dataLabel, setDataLabel] = useState([]);
  const [dataSeries, setDataSeries] = useState([]);

  // useEffect(() => {
  //   const labelArray = [];
  //   const dataArray = [];
  //   locationWiseData.forEach((data) => {
  //     labelArray.push(data.location);
  //     dataArray.push(data.count);
  //   });
  //   setDataLabel(labelArray);
  //   setDataSeries(dataArray);
  // }, [locationWiseData]);

  const options = {
    series: [
      {
        name: "Docked Time",
        data: dockedTime,
      },
      {
        name: "Offloading Time",
        data: offloadingPerDock,
      },
      {
        name: "Idle Time",
        data: idleTimePerDock,
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
        columnWidth: "55%",
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
      categories: ["Dock1", "Dock2", "Dock3", "Dock4"],
      title: {
        text: "Docks",
      },
    },
    yaxis: {
      title: {
        text: "Mins",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " mins";
        },
      },
    },
  };

  return (
    <div style={{ minHeight: "300px" }}>
      <Chart
        options={options}
        series={options.series}
        type="bar"
        height={400}
      />
    </div>
  );
}
