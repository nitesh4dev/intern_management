import React, { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router";
import { DataContext } from "../../Context/DataContext";

export default function WorkerTimeTrends({ timeIds, workerTime, colours }) {
  //   const [dataLabel, setDataLabel] = useState([]);
  //   const [dataSeries, setDataSeries] = useState([]);

  //   useEffect(() => {
  //     const data = totalIdleHours / 60 / totalWorkersDetected;
  //     const dataArray = [];
  //     dataArray.push(parseInt(data));
  //     setDataSeries(dataArray);
  //   }, [totalIdleHours, totalWorkersDetected, colours]);

  const history = useHistory();
  const { setTitle } = useContext(DataContext);

  var options = {
    series: [
      {
        name: "Workers Detected",
        data: workerTime,
      },
    ],
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
      events: {
        markerClick: (event, chartContext, config) => {
          setTitle("Blue Collar Worker Efficiency");
          history.push("/trends");
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    colors: colours,

    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: timeIds,
      title: {
        text: "Time",
      },
    },
    yaxis: {
      title: {
        text: "Workers Detected",
      },
    },
  };

  return (
    <Chart options={options} series={options.series} type="line" height={310} />
  );
}
