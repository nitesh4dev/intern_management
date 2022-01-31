import React, { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { db } from "../../firebase/Firebase";
import SecondGraph from "./SecondGraph";
import { useHistory } from "react-router";
import { DataContext } from "../../Context/DataContext";

export default function AttendanceGraph({ totalTrucksArray, colours }) {
  let history = useHistory();
  const { setTitle } = useContext(DataContext);

  const [dataLabel, setDataLabel] = useState([]);
  const [dataSeries, setDataSeries] = useState([]);
  const docArray = [1, 2, 3, 4];

  useEffect(() => {
    const labelArray = [];
    const dataArray = [];
    docArray.forEach((doc) => {
      db.collection(`truckdata_new/${doc}/2021-11-23`)
        .get()
        .then((snapshot) => {
          const documents = snapshot.docs.map((doc) => doc.data());
          dataArray.push(documents.length);
          setDataSeries(dataArray);
        });
    });
  }, [totalTrucksArray, colours]);

  // console.log(totalTrucksArray);

  const options = {
    labels: dataLabel,
    chart: {
      id: "basic-bar",
      events: {
        dataPointSelection: (event, chartContext, config) => {
          setTitle("Dock Utilization");
          history.push("/dockutilization");
        },
      },
    },
    colors: colours,
    xaxis: {
      categories: ["Dock1", "Dock2", "Dock3", "Dock4"],
      title: {
        text: "Docks",
      },
    },
    yaxis: {
      title: {
        text: "Trucks",
      },
    },
  };
  const series = [
    {
      name: "trucks",
      data: totalTrucksArray,
      // data: ttd,
    },
  ];

  // var options = {
  //   series: [
  //     {
  //       name: "Expected",
  //       data: dataSeries,
  //     },
  //   ],
  //   chart: {
  //     type: "bar",
  //     height: 350,
  //   },
  //   color: colours,
  //   plotOptions: {
  //     bar: {
  //       horizontal: false,
  //       columnWidth: "65%",
  //       endingShape: "rounded",
  //     },
  //   },
  //   dataLabels: {
  //     enabled: false,
  //   },
  //   stroke: {
  //     show: true,
  //     width: 2,
  //     colors: ["transparent"],
  //   },
  //   xaxis: {
  //     categories: ["Dock1", "Dock2", "Dock3", "Dock4"],
  //   },
  //   yaxis: {
  //     title: {},
  //   },
  //   fill: {
  //     opacity: 1,
  //   },
  // };

  return (
    <div>
      <Chart options={options} series={series} type="bar" height={310} />
    </div>
  );
}
