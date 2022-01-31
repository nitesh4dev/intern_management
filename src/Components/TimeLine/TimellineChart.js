import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Chart from "react-apexcharts";
import Average from "../subtrends/Average";
import {
  Grid,
  Card,
  Typography,
  Box,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import { PeopleAltOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import clsx from "clsx";
import moment from "moment";
import { useHistory } from "react-router";
import ModalComponent from "../ModalComponent";
import { DataContext } from "../../Context/DataContext";

const useStyles = makeStyles((theme) => ({
  card: {
    transition: "0.3s",
    "&:hover": {
      boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    },
  },
  cardStyle: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
  },
  iconHolder: {
    padding: theme.spacing(3, 2),
    backgroundColor: "#ECECEC",
  },
}));

export default function TimelineChart({ colours }) {
  const history = useHistory();
  const [series, setSeries] = useState("Truck");
  const [dock, setDock] = useState("Dock 1");
  const [offload, setOffload] = useState(0);
  const { handleOpen } = React.useContext(DataContext);

  var options = {
    series: [
      {
        name: "Truck 1",
        data: [44, 55, 41, 37],
      },
      {
        name: "Truck 2",
        data: [53, 32, 33, 52],
      },
      {
        name: "Truck 3",
        data: [12, 17, 11, 9],
      },
      {
        name: "Truck 4",
        data: [9, 7, 5, 8],
      },
      {
        name: "Truck 5",
        data: [25, 12, 19, 32],
      },
    ],
    options: {
      colors: colours,
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        events: {
          dataPointSelection: (event, chartContext, config) => {
            console.log(chartContext);
            handleOpen();
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      // title: {
      //   text: "Fiction Books Sales",
      // },
      xaxis: {
        categories: ["Dock 1", "Dock 2", "Dock 3", "Dock 4"],
        title: {
          text: "time (mins)",
        },
        labels: {
          formatter: function (val) {
            return val;
          },
        },
      },
      yaxis: {
        title: {
          text: "Dock",
        },
      },
      tooltip: {
        x: {
          formatter: function (val) {
            return val;
          },
          title: {
            formatter: (seriesName) => {
              setDock(seriesName);
            },
          },
        },
        y: {
          formatter: function (val) {
            setOffload(val);
            return val;
          },
          title: {
            formatter: (seriesName) => {
              setSeries(seriesName);
              return `${seriesName}:`;
            },
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: 40,
      },
    },
  };

  return (
    <div>
      <Chart
        options={options.options}
        series={options.series}
        type="bar"
        height={400}
      />
      <ModalComponent series={series} dock={dock} offload={offload} />
    </div>
  );
}
